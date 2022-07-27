import { create } from "domain";
import { Router } from "express";
import { resolve } from "path";
import prisma from "../config/prisma";
import sendEmail from "./nodeEmailer";

const userRouter = Router();

userRouter.get("/:id", async(req, res) =>
{
	try
	{
		const { id } = req.params;
		console.log(id);

		const user = await prisma.user.findMany({ where: { id: parseInt(id) }});

		if(!user)
		{
			res.status(404).json({ error: true, msg: "Cannot find this user *panic* "});
			return;
		}

		return res.status(200).json(user);
	}
	catch (error)
	{
		console.log("error ===", error);
		res.status(404).json({ error: true, msg: error });
	}
})



.post("/createNewUser", async(req, res) =>
{
	const { email, password, firstName, lastName, phoneNumber, userType } = req.body;

	const userExists = await prisma.user.findUnique({ where: { email: email }});

	if(userExists)
	{
		res.status(400).json("This email is already in use");
		return;
	}

	const newUser = await prisma.user.create({
		data:{
			email:email,
			password:password,
			firstName:firstName,
			lastName:lastName,
			phoneNumber:phoneNumber,
			userType:userType
		}
	});

	console.log("newUser", newUser);


})
.post("/signUpForJob", async(req, res) =>
{
	try
	{
		const { email, password, firstName, lastName, phoneNumber, userType, jobId } = req.body;

		const userExists = await prisma.user.findUnique({ where: { email: email }});

		let newUser;
		let userId;

		//if the user has not signed upped before and is not in the user table
		if(!userExists)
		{
			newUser = await prisma.user.create({
				data:{
					email:email,
					password:password,
					firstName:firstName,
					lastName:lastName,
					phoneNumber:phoneNumber,
					userType:userType
				}
			});
			console.log("newUser", newUser);
			userId=newUser.id;
		}else {
			userId=userExists.id;
			//check if the existing user has applied for this job before
			const userAppliedBefore = await prisma.jobsOnUsers.findMany({
      			where: {
       			 AND: [
					{ userId : userId},
					{ jobId : jobId},
        			],
     			 },
			})
			if (userAppliedBefore.length!==0){
				res.status(404).send({ error: true, msg: "This user already signed up for this job" }) ;
				return;
			}
			//update the new information that user has entered for existing user
			try
			{
			const user = await prisma.user.update({
				where: { id: userId },
				data: {
					email:email,
					firstName:firstName,
					lastName:lastName,
					phoneNumber:phoneNumber,
				}
			});
			}
			catch (error)
			{
				console.log("error ===", error);
				res.status(404).json({ error: true, msg: error });
			}
		}
	
		const signUpForJob = await prisma.jobsOnUsers.create({
			data: {
				jobId: jobId,
				userId: userId
			}
		});

		if(!signUpForJob)
			res.status(404).send({ error: true, msg: "Cannot sign up for this role" });

		
		else {
			//get information from job table to pass for the confirmation email body
			const job = await prisma.job.findMany({ where: { id: jobId }});
			sendEmail(req,res,firstName,lastName,email,job);
			
		}
	 }
	catch (error)
	{
		console.log("error: ", error);
		res.status(400).send({ error: true, msg: error });
	}
});


export default userRouter;

