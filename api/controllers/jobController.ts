import { Router } from "express";
import prisma from "../config/prisma";

const jobsRouter = Router();

interface Job {
  jobTitle: string;
  date: string;
  startTime: string;
  endTime: string;
  slots: number;
  filledSlots: number;
  weekId: number;
}

jobsRouter
  .get("/", async (req, res) => {
    try {
      const jobs = await prisma.job.findMany();

      if (!jobs) {
        res
          .status(404)
          .json({ error: true, msg: "Cannot find any jobs *panic* " });
        return;
      }

      return res.status(200).json(jobs);
    } catch (error) {
      console.log("error ===", error);
      res.status(404).json({ error: true, msg: error });
    }
  })
  .post("/", async (req, res) => {
    try {
      const {
        jobTitle,
        date,
        startTime,
        endTime,
        slots,
        filledSlots = 0,
        weekId,
      } = req.body;

      const job: Job = await prisma.job.create({
        data: {
          jobTitle: jobTitle,
          date: date,
          startTime: startTime,
          endTime: endTime,
          slots: slots,
          filledSlots: filledSlots,
          weekId: weekId,
        },
      });

      return res
        .status(200)
        .json({ msg: "Week added successfully!", data: job });
    } catch (error) {
      console.log("error ===", error);
      res.status(404).json({ error: true, msg: error });
    }
  })
  .get("/:id", async (req, res) => {
    try {
      const { id } = req.params;

      const job = await prisma.job.findUnique({
        where: { id: parseInt(id) },
        include: { week: true },
      });

      if (!job) {
        res.status(404).json({ error: true, msg: "Cannot find this job :(" });
        return;
      }

      res.status(200).json({ msg: "Job added successfully!", data: job });
    } catch (error) {
      console.log("error ===", error);
      res.status(404).json({ error: true, msg: error });
    }
  })
  .delete("/:id", async (req, res) => {
    try {
      const { id } = req.body;
      const selected = await prisma.job.findUnique({
        where: { id: parseInt(id) },
      });
      if (!selected) {
        res.status(404).json({ error: true, msg: "Cannot find this job" });
        return;
      }
      res.status(200).json({ msg: "job deleted successfully!" });
    } catch (err) {
      res.status(404).json({ error: true, msg: err });
    }
  });

export default jobsRouter;
