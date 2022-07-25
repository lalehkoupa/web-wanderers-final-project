import { Router } from "express";
import prisma from "../config/prisma";

const weeksRouter = Router();

interface Week {
  weekDate: string;
  openSlots: number;
  filledSlots: number;
}

weeksRouter
  .get("/", async (req, res) => {
    try {
      const allWeeks = await prisma.week.findMany();

      if (!allWeeks) {
        res
          .status(404)
          .json({ error: true, msg: "Cannot find this any rotas *panic* " });
      }

      return res.status(200).json(allWeeks);
    } catch (error) {
      console.log("error ===", error);
      res.status(404).json({ error: true, msg: error });
    }
  })
  .post("/", async (req, res) => {
    try {
      const { weekDate, openSlots, filledSlots = 0 } = req.body;

      const week: Week = await prisma.week.create({
        data: {
          weekDate: weekDate,
          openSlots: openSlots,
          filledSlots: filledSlots,
        },
      });

      return res
        .status(200)
        .json({ msg: "Week added successfully!", data: week });
    } catch (error) {
      console.log("error ===", error);
      res.status(404).json({ error: true, msg: error });
    }
  })
  .get("/:id", async (req, res) => {
    try {
      const { id } = req.params;

      const week = await prisma.week.findUnique({
        where: { id: parseInt(id) },
        include: { jobs: true },
      });

      if (!week) {
        res.status(404).json({ error: true, msg: "Cannot find this week :(" });
        return;
      }

      res.status(200).json({ msg: "week added successfully!", data: week });
    } catch (error) {
      console.log("error ===", error);
      res.status(404).json({ error: true, msg: error });
    }
  })
  .delete("/:id", async (req, res) => {
    try {
      const { id } = req.params;

      await prisma.week.delete({ where: { id: parseInt(id) } });

      return res
        .status(200)
        .json({ msg: "Week has been deleted successfully" });
    } catch (error) {
      res.status(404).json({ msg: "we have an error", error: error });
    }
  })
  .patch("/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const { weekDate, openSlots, filledSlots = 0 } = req.body;

      const week = await prisma.week.update({
        where: { id: parseInt(id) },
        data: {
          weekDate: weekDate,
          openSlots: openSlots,
          filledSlots: filledSlots,
        },
      });

      return res
        .status(200)
        .json({ msg: "Week updated successfully!", data: week });
    } catch (error) {
      console.log("error ===", error);
      res.status(404).json({ error: true, msg: error });
    }
  });

export default weeksRouter;
