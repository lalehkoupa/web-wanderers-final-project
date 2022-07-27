import { Router } from "express";
import weeksRouter from "../controllers/weekController";
import jobRouter from "../controllers/jobController";
import userRouter from "../controllers/userController";

const router = Router();

router.get("/", (req, res) =>
{
	res.status(200).json("API is alive!!!");
});

router.use("/week", weeksRouter);
router.use("/job", jobRouter);
router.use("/user", userRouter);

export { router };
