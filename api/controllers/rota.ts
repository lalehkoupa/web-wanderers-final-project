const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// Get all the rotas from the database
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

// Get one Rota from the database
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

// Create one Rota 
const createOneRota = async (req, res) => {
	

	const { rotaName, startDate, endDate,openSlot,filledSlots,
		jobs } = req.body
	try {
		const createRota = await prisma.rota.create({
			data: {
				rotaName,
				startDate,
				endDate, 
				openSlot,
				filledSlots,
				jobs
			},
		})

		if (!createRota)
			res.status(404).send({ error: true, msg: "Cannot create any rotas *panic* " });

		res.status(200).send({ sucess: true, createRota });
	}
	catch (error) {
		console.log("error ===", error);
		res.status(400).send({ error: true, msg: error });
	}
};

// Update one Rota from the database
const updateRota = async (req, res) => {
	const { id } = req.params;

	if (!id)
		res.status(404).send("No id?");

	const idInt = parseInt(id);

	try {
		const rota = await prisma.rota.update({ where: { id: idInt } , 
		data:{
			body: req.body
		} })
			
		
		if (!rota)
			res.status(404).send({ error: true, msg: "Cannot find this rota :'( " });

		res.status(200).send({ sucess: true, rota});
	}
	catch (error) {
		console.log("error ===", error);
		res.status(400).send({ error: true, msg: error });
	}
};

// Delete one Rota from the database
const deleteRota = async (req, res) => {
	const { id } = req.params;

	if (!id)
		res.status(404).send("No id?");

	const idInt = parseInt(id);

	try {
		const rota = await prisma.rota.delete({
			where: { id: idInt },
		})


		if (!rota)
			res.status(404).send({ error: true, msg: "Cannot find this rota :'( " });

		res.status(200).send({ sucess: true, rota });
	}
	catch (error) {
		console.log("error ===", error);
		res.status(400).send({ error: true, msg: error });
	}
};

module.exports = { getAllRotas, getOneRota,createOneRota, updateRota, deleteRota };