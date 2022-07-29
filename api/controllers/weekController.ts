import { Router } from "express";
import prisma from "../config/prisma";

const weeksRouter = Router();

interface Week {
  weekDate: string;
  openSlots: number;
  filledSlots: number;
}

const checkWeekExists = async(weekDate: string) =>
{
	const weekExists = await prisma.week.findMany({
		where: { weekDate: weekDate },
		include: { jobs: true }
	});

	if(weekExists)
		return true;

	return false;
};

weeksRouter
.get("/", async(req, res) => {
	try {
		const allWeeks = await prisma.week.findMany({
      where: {
        weekDate: { gte: new Date().toLocaleDateString([], {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }) },
      },
    });

		if(!allWeeks) {
			res
			.status(404)
			.json({ error: true, msg: "Cannot find any week " });
		}

		return res.status(200).json(allWeeks);
	} catch (error) {
		console.log("error ===", error);
		return res.status(404).json({ error: true, msg: error });
	}
})
.post("/", async(req, res) => {
	try {
		const { weekDate, openSlots, filledSlots = 0 } = req.body;

		const weekExists = await checkWeekExists(weekDate);

		if(weekExists)
		{
			return res.status(400).json("This week date already exists");
			return;
		}

		const week: Week = await prisma.week.create({
			data: {
				weekDate: weekDate,
				openSlots: openSlots,
				filledSlots: filledSlots
			}
		});

		return res.status(200).json({ msg: "Week added successfully!", data: week });

	} catch (error) {
		console.log("error ===", error);
		return res.status(404).json({ error: true, msg: error });
	}
})
.get("/:id", async(req, res) => {
	try {
		const { id } = req.params;

		const week = await prisma.week.findUnique({
			where: { id: parseInt(id) },
			include: { jobs: true }
		});

		if(!week) {
			return res.status(404).json({ error: true, msg: "Cannot find this week :(" });
			return;
		}

		return res.status(200).json(week);
	} catch (error) {
		console.log("error ===", error);
		return res.status(404).json({ error: true, msg: error });
	}
})
.delete("/:id", async(req, res) => {
	try {
		const { id } = req.params;

		const weekExists = await prisma.week.findUnique({ where: { id: parseInt(id) } });

		if(!weekExists)
		{
			res.status(400).json("This week date doesn't exists");
			return;
		}

		await prisma.week.delete({ where: { id: parseInt(id) } });

		return res.status(200).json({ msg: "Week has been deleted successfully" });

	} catch (error)
	{
		return res.status(404).json({ msg: "we have an error", error: error });
	}
})
.patch("/:id", async(req, res) => {
	try {
		const { id } = req.params;
		const { weekDate, openSlots, filledSlots = 0 } = req.body;

		const weekExists = await checkWeekExists(weekDate);

		if(weekExists)
		{
			res.status(400).json("This week already exists! Please check the params and or week date");
			return;
		}

		const week = await prisma.week.update({
			where: { id: parseInt(id) },
			data: {
				weekDate: weekDate,
				openSlots: openSlots,
				filledSlots: filledSlots
			}
		});

		return res.status(200).json({ msg: "Week updated successfully!", data: week });

	} catch (error) {
		console.log("error ===", error);
		res.status(404).json({ error: true, msg: error });
	}
});

export default weeksRouter;
