import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { weekData } from "./weekData";

// handles the database connections for us
const prisma = new PrismaClient();

// Here we create the run() function that will take the seed data, map over it, and create each row in the database for us
const run = async() =>
{
	// We Promise all becuase it runs faster than doing indervidual awaits.
	await Promise.all(
		weekData.map(async(week) =>
		{
			// upsert will either update a row if it exsists, or create a new row if it does not.
			// with upsert we can write queries in JavaScript that are translated in to SQL for us
			return prisma.week.upsert({
				where: { weekDate: week.weekDate },
				update: {},
				create: {
					weekDate: week.weekDate,
					openSlots: week.openSlots,
					filledSlots: week.filledSlots,
					jobs: {
						create: week.jobs.map((job) => ({
							jobTitle: job.jobTitle,
							date: job.date,
							startTime: job.startTime,
							endTime: job.endTime,
							slots: job.slots,
							filledSlots: job.filledSlots
						})),
					},
				},
			});
		})
	);

	// Salt will hash the password for us. It is like a secret key we use to unlock passwords.
	const salt = bcrypt.genSaltSync();

	// upsert all the seed users
	await prisma.user.upsert({
		where: { email: "test@gmail.com" },
		update: {},
		create: {
			email: "test@gmail.com",
			password: bcrypt.hashSync("password", salt),
			firstName: "Michael",
			lastName: "Henderson",
			phoneNumber: "07777777777",
			userType: 100
		},
	});
};

// Instansiate the run() function, catch an errors, and finally disconnect from the database.
run()
.catch((e) =>
{
	console.error(e);
	process.exit(1);
})
.finally(async() =>
{
	await prisma.$disconnect();
});