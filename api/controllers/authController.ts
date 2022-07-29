import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import prisma from "../config/prisma";
import { Router } from "express";

const authRouter = Router();

const SECRET = "alright then, keep your secrets";
const saltRounds = 10;

authRouter
  .post("/registerAdmin", async (req, res) => {
    const { email, password } = req.body;
    try {
	  const user = await prisma.user.findUnique({where:{
		email:email,
	  },
	})

	if(!user){
	  bcrypt.genSalt(saltRounds, function (err, salt) {
        bcrypt.hash(password, salt, async function (err, hash) {
          const newUser = await prisma.user.create({
            data: {
              email: email,
              password: hash,
              firstName: "",
              lastName: "",
              phoneNumber: "",
              userType: 500,
            },
          });
        });
      });}else{
		      return res.status(404).json({ msg: "user already exist" });

	  }


      return res.status(200).json({ msg: `New Admin has been added!` });
    } catch (err) {
      console.log("error", err);
      return res.status(404).json({ msg: err });
    }
  })

  .post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
      const userToLogin = await prisma.user.findUnique({
        where: { email: email },
      });
	console.log(userToLogin);
	
      
      if (!userToLogin)
        return res
          .status(404)
          .json({ success: false, msg: "user not register" });
          const match = await bcrypt.compare(
            password,
            userToLogin.password
          );
      if (!match) {
        return res
          .status(404)
          .json({ success: false, msg: "Password is incorrect" });
      }
	  let type=userToLogin.userType;
 if (type === 100) {
   return res.status(404).json({ success: false, msg: "Not authorized" });
 }
 
      const token = jwt.sign({ sub: userToLogin.id }, SECRET, {
        expiresIn: "1h",
      });

      return res
        .status(200)
        .json({ message: `Welcome back ${userToLogin.email}`, token ,type});
    } catch (error) {
      console.log("AUTH ERROR!", error);
      res.status(404).json({ error: true, msg: error });
    }
  });


export default authRouter;


