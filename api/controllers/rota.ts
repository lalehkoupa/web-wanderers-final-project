const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const getAllRotas = async(req, res) =>
{
	try
	{
		const rotas = await prisma.rota.findMany();

		if(!rotas)
			res.status(404).send({ error: true, msg: "Cannot find this any rotas *panic* " });

		res.status(200).send({ sucess: true, ...rotas });
	}
	catch (error)
	{
		console.log("error ===", error);
		res.status(400).send({ error: true, msg: error});
	}
};

const getOneRota = async(req, res) =>
{
	const { id } = req.params;

	if(!id)
		res.status(404).send("No id?");

	const idInt = parseInt(id);

	console.log(typeof idInt);

	try
	{
		const rota = await prisma.rota.findUnique({ where: {id: idInt} });

		if(!rota)
			res.status(404).send({ error: true, msg: "Cannot find this rota :'( " });

		res.status(200).send({ sucess: true, ...rota });
	}
	catch (error)
	{
		console.log("error ===", error);
		res.status(400).send({ error: true, msg: error});
	}
};

module.exports = { getAllRotas, getOneRota };