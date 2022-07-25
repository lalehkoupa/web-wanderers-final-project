import { Router } from "express";
import prisma from "../config/prisma";

const userRouter = Router();

const createUser = async (
  email: string,
  password: string,
  firstName: string,
  lastName: string,
  phoneNumber: string,
  userType: number
) => {
  const newUser = await prisma.user.create({
    data: {
      email: email,
      password: password,
      firstName: firstName,
      lastName: lastName,
      phoneNumber: phoneNumber,
      userType: userType,
    },
  });

  return newUser;
};

userRouter
  .get("/:id", async (req, res) => {
    try {
      const { id } = req.params;

      const user = await prisma.job.findMany({ where: { id: parseInt(id) } });

      if (!user) {
        res
          .status(404)
          .json({ error: true, msg: "Cannot find this user *panic* " });
        return;
      }

      return res.status(200).json(user);
    } catch (error) {
      console.log("error ===", error);
      res.status(404).json({ error: true, msg: error });
    }
  })
  .post("/createNewUser", async (req, res) => {
    const { email, password, firstName, lastName, phoneNumber, userType } =
      req.body;

    const userExists = await prisma.user.findUnique({
      where: { email: email },
    });

    if (userExists) {
      res.status(400).json("This email is already in use");
      return;
    }

    const newUser = await createUser(
      email,
      password,
      firstName,
      lastName,
      phoneNumber,
      userType
    );

    console.log("newUser", newUser);
  })
  .post("/signUpForJob", async (req, res) => {
    try {
      const {
        email,
        password,
        firstName,
        lastName,
        phoneNumber,
        userType,
        jobId,
      } = req.body;

      const userExists = await prisma.user.findUnique({
        where: { email: email },
      });

      let newUser;
      let userId;

      if (!userExists) {
        newUser = await prisma.user.create({
          data: {
            email,
            password,
            firstName,
            lastName,
            phoneNumber,
            userType,
          },
        });
        userId = newUser.id;

        console.log("newUser", newUser);
      }
      const signUpForJob = await prisma.jobsOnUsers.create({
        data: {
          jobId: jobId,
          userId: userExists ? userExists.id : userId,
        },
      });

      if (!signUpForJob) {
        res
          .status(404)
          .send({ error: true, msg: "Cannot sign up for this role" });

        //Laleh to add nodemailer
        // send email confimation if everything is sucsefull.
      }
      res
        .status(200)
        .send({ sucess: true, msg: "You have signed up sucesfully!" });
      return;
    } catch (error) {
      console.log("error: ", error);
      res.status(400).send({ error: true, msg: error });
    }
  });

export default userRouter;
