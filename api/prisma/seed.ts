import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { rotaData } from "./rotaData";

// handles the database connections for us
const prisma = new PrismaClient();

const run = async() =>
{
	await Promise.all(
		rotaData.map(async(rota) =>
		{
			return prisma.rota.upsert({
				where: { rotaName: rota.rotaName },
				update: {},
				create: {
					rotaName: rota.rotaName,
					startDate: rota.startDate,
					endDate: rota.endDate,
					openSlots: rota.openSlots,
					filledSlots: rota.filledSlots,
					jobs: {
						create: rota.jobs.map((job) => ({
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

	const salt = bcrypt.genSaltSync();

	await prisma.user.upsert({
		where: { email: "user@test.com" },
		update: {},
		create: {
			email: "user@test.com",
			password: bcrypt.hashSync("password", salt),
			firstName: "Scott",
			lastName: "Moss",
			phoneNumber: "07777777777",
			userType: 100
		},
	});
};

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