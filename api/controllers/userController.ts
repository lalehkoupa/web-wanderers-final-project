import { Router } from "express";
import prisma from "../config/prisma";
import _ from "lodash";
import sendEmail from "./nodeEmailer";

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
  .get("/:id", async (req: any, res: any) => {
    try {
      const { id } = req.params;

      // Find the user by id using the req.params
      const user = await prisma.user.findUnique({
        where: { id: parseInt(id) },
      });

      if (!user) {
        res
          .status(404)
          .json({ error: true, msg: "Cannot find this user *panic* " });
        return;
      }

      // Only send back important date, do not send back password for example
      const userJSON = _.pick(
        user,
        "id",
        "email",
        "firstName",
        "lastName",
        "phoneNumber",
        "userType"
      );

      return res.status(200).json(userJSON);
    } catch (error) {
      console.log("error ===", error);
      res.status(404).json({ error: true, msg: error });
    }
  })

  //create new user
  .post("/", async (req, res) => {
    try {
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

      const userJSON = _.pick(
        newUser,
        "id",
        "email",
        "firstName",
        "lastName",
        "phoneNumber",
        "userType"
      );

      return res.status(200).json({ msg: "New user added!!!", ...userJSON });
    } catch (error) {
      console.log("error posting new user", error);
      return res.status(400).json({ msg: "cannot add this user", error: true });
    }
  })
  .post("/signUpForJob", async (req, res) => {
    try {
      const {
        email,
        password = "",
        firstName,
        lastName,
        phoneNumber,
        userType = 100,
        jobId,
      } = req.body;
      const weekId:any = await prisma.job.findUnique({
        select: {
          weekId: true,
        },
        where: {
          id: jobId,
        },
      });
      const userExists = await prisma.user.findUnique({
        where: { email: email },
      });

      let newUser;
      let userId;

      if (!userExists) {
        newUser = await createUser(
          email,
          password,
          firstName,
          lastName,
          phoneNumber,
          userType
        );
        userId = newUser.id;

        console.log("newUser", newUser);
      } else {
        userId = userExists.id;
        //check if the existing user has applied for this job before
        const userAppliedBefore = await prisma.jobsOnUsers.findMany({
          where: {
            AND: [{ userId: userExists.id }, { jobId: jobId }],
          },
        });
        if (userAppliedBefore.length !== 0) {
          res.status(404).send({
            error: true,
            msg: "You already have signed up for this job",
          });
          return;
        }
        //update the new information that user has entered for existing user
        try {
          const user = await prisma.user.update({
            where: { id: userId },
            data: {
              email: email,
              firstName: firstName,
              lastName: lastName,
              phoneNumber: phoneNumber,
            },
          });
        } catch (error) {
          console.log("error ===", error);
          res.status(404).json({ error: true, msg: error });
        }
      }
      const signUpForJob = await prisma.jobsOnUsers.create({
        data: {
          jobId: jobId,
          userId: userId,
        },
      });
      if (signUpForJob) {
        const incrementJob = await prisma.job.update({
          where: {
            id: jobId,
          },
          data: { filledSlots: { increment: 1 } },
        });
        const incrementWeek = await prisma.week.update({
          where: {
            id: weekId.weekId,
          },
          data: { filledSlots: { increment: 1 } },
        });
      }

      if (!signUpForJob)
        res
          .status(404)
          .send({ error: true, msg: "Cannot sign up for this role" });

      //get information from job table to pass for the confirmation email body
      const job = await prisma.job.findMany({ where: { id: jobId } });
      sendEmail(req, res, firstName, lastName, email, job);
    } catch (error) {
      console.log("error: ", error);
      res.status(400).send({ error: true, msg: error });
    }
  });

export const USER_TYPES = {
  100: "VOLUNTEER",
  500: "ADMIN",
  1000: "SUPER_ADMIN",
};

export default userRouter;
