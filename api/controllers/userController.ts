import { Router } from "express";
import prisma from "../config/prisma";
import _ from "lodash";

const userRouter = Router();

const createUser = async(email: string, password: string, firstName: string, lastName: string, phoneNumber: string, userType: number) =>
{
	const newUser = await prisma.user.create({
		data: {
			email: email,
			password: password,
			firstName: firstName,
			lastName: lastName,
			phoneNumber: phoneNumber,
			userType: userType
		}
	});

	return newUser;
};

userRouter.get("/:id", async(req, res) =>
{
	try
	{
		const { id } = req.params;

		// Find the user by id using the req.params
		const user = await prisma.user.findUnique({ where: { id: parseInt(id) }});

		if(!user)
		{
			res.status(404).json({ error: true, msg: "Cannot find this user *panic* "});
			return;
		}

		// Only send back important date, do not send back password for example
		const userJSON = _.pick(user, "id", "email", "firstName", "lastName", "phoneNumber", "userType");

		return res.status(200).json(userJSON);
	}
	catch (error)
	{
		console.log("error ===", error);
		res.status(404).json({ error: true, msg: error });
	}
})
.post("/", async(req, res) =>
{
	try
	{
		const { email, password, firstName, lastName, phoneNumber, userType } = req.body;

		const userExists = await prisma.user.findUnique({ where: { email: email }});

		if(userExists)
		{
			res.status(400).json("This email is already in use");
			return;
		}

		const newUser = await createUser(email, password, firstName, lastName, phoneNumber, userType);

		const userJSON = _.pick(newUser, "id", "email", "firstName", "lastName", "phoneNumber", "userType");

		return res.status(200).json({ msg: "New user added!!!", ...userJSON });
	} catch (error)
	{
		console.log("error posting new user", error);
		return res.status(400).json({ msg: "cannot add this user", error: true });
	}
})
.post("/signUpForJob", async(req, res) =>
{
	try
	{
		const { email, password, firstName, lastName, phoneNumber, userType = 100, jobId, userId } = req.body;

		const userExists = await prisma.user.findUnique({ where: { email: email }});

		let newUser;

		if(!userExists)
		{
			newUser = await createUser(email, password, firstName, lastName, phoneNumber, userType);

			console.log("newUser", newUser);
		}

		const signUpForJob = await prisma.jobsOnUsers.create({
			data: {
				jobId: jobId,
				userId: userExists ? userId : newUser?.id
			}
		});

		if(!signUpForJob)
			res.status(404).send({ error: true, msg: "Cannot sign up for this role" });

		//Laleh to add nodemailer
		// send email confimation if everything is sucsefull.

		res.status(200).send({ sucess: true, msg: "You have signed up sucesfully!" });
		return;
	}
	catch (error)
	{
		console.log("error: ", error);
		res.status(400).send({ error: true, msg: error });
	}
});

export const USER_TYPES = {
	100: "VOLUNTEER",
	500: "ADMIN",
	1000: "SUPER_ADMIN"
};


export default userRouter;