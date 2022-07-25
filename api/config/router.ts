import { Router } from "express";
import weeksRouter from "../controllers/weeks";
import jobRouter from "../controllers/jobs";
import userRouter from "../controllers/users";

const router = Router();

router.use("/weeks", weeksRouter);
router.use("/jobs", jobRouter);
router.use("/user", userRouter);

export { router };
