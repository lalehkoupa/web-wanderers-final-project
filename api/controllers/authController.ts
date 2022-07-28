import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import prisma from "../config/prisma";
import { Router } from "express";

const authRouter = Router();

const SECRET = "alright then, keep your secrets";


authRouter.post("/registerAdmin", async(req, res) =>{
 	const { email, password} = req.body;
	try {
		//console.log(bcrypt(password));
		const newUser = await prisma.user.create({
		data: {
			email: email,
			password: password,
			firstName: "",
			lastName: "",
			phoneNumber: "",
			userType: 500,
		}
	});
		//console.log("new user ", newUser.firstName);

		return res.status(202).json({ message: `Welcome ${newUser.email}!` });
	} catch (err) {
		console.log("error", err);
		return res.status(422).json({ message: err });
	}

})


.post("/login", async(req, res) =>{
	const {email,password} = req.body;
	
	try {
		const userToLogin = await prisma.user.findUnique({where: {email: email,},});

		if(!userToLogin)
		return res.status(404).json({ success: false, msg: "Your email address in incorrect"})
			//throw new ReferenceError("Woah! Have you registered?");
		if (userToLogin.password!==password){
			return res.status(404).json({ success: false, msg: "Your password in incorrect"})
		}

		// const isPasswordCorrect=await bcrypt.compare(password, userToLogin.password);
		// console.log(isPasswordCorrect);
		// if( !isPasswordCorrect)
		// 	//throw new ReferenceError("Hmm... That's not correct");
		// return res.status(404).json({ success: false, msg: "Hmm... That's not correct password"})


		const token = jwt.sign({ sub: userToLogin.id }, SECRET, {
      expiresIn: "1h",
    });

		return res
		.status(200)
		.json({ message: `Welcome back ${userToLogin.email}`, token });


	}catch (error)
		{
			console.log("AUTH ERROR!", error);
			res.status(404).json({ error: true, msg: error });
		}
});


export default authRouter;
