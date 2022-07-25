// add user controller here
const prisma = require("../config/prisma");

const dateList = async(req, res) => {
	try {
		const jobDate = await prisma.job.findMany({ select: { date: true, slots:true } });

		if(!rota)
			res.status(404).send({ error: true, msg: "Cannot find any date  " });

		res.status(200).send({ sucess: true, ...jobDate });
	} catch (error) {
		console.log("error ===", error);
		res.status(400).send({ error: true, msg: error });
	}
};

const getAllJob = async(req, res) => {
	try {
		const job = await prisma.job.findMany();

		if(!rota)
			res.status(404).send({ error: true, msg: "Cannot find any job  " });

		res.status(200).send({ sucess: true, ...job });
	} catch (error) {
		console.log("error ===", error);
		res.status(400).send({ error: true, msg: error });
	}
};

const getJob = async(req, res) => {
	const { id } = req.params;

	if(!id) res.status(404).send("No id?");

	const idInt = parseInt(id);


	try {
		const oneJob = await prisma.job.findUnique({ where: { id: idInt } });

		if(!rota)
			res.status(404).send({ error: true, msg: "Cannot find this Job " });

		res.status(200).send({ sucess: true, ...oneJob });
	} catch (error) {
		console.log("error ===", error);
		res.status(400).send({ error: true, msg: error });
	}
};

module.exports = { dateList, getJob, getAllJob };