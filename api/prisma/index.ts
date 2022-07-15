import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient;

const main = async() => 
{

}

main()
	.catch((error) =>
	{
		throw error
	})
	.finally(async() =>
	{
		await prisma.$disconnect
	});