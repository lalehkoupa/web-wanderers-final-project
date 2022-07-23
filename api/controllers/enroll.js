const prisma = require("../config/prisma");

// Get all the enroll volunteers
const getAllJobVolunteer = async(req, res) => {
	try {
		const rotas = await prisma.rota.findMany();

		if(!rotas)
		{res
		.status(404)
		.send({ error: true, msg: "Cannot find this any rotas *panic* " });}

		res.status(200).send({ sucess: true, ...rotas });
	} catch (error) {
		console.log("error ===", error);
		res.status(400).send({ error: true, msg: error });
	}
};

const unenrollForJob = async(req, res) => {
	try {
		const rotas = await prisma.rota.findMany();

		if(!rotas)
		{res
		.status(404)
		.send({ error: true, msg: "Cannot find this any rotas *panic* " });}

		res.status(200).send({ sucess: true, ...rotas });
	} catch (error) {
		console.log("error ===", error);
		res.status(400).send({ error: true, msg: error });
	}
};

const enrollForJob = async(req, res) => {
	const {jobId, userId } = req.body;

	try
	{
		const signUpForJob = await prisma.JobsOnUsers.create({
			data: {
				jobId: jobId,
				userId: userId
			}
		});

		if(!signUpForJob)
			res.status(404).send({ error: true, msg: "Cannot sign up for this role" });

		res.status(200).send({ sucess: true, msg: "You have signed up sucesfully!" });
	}
	catch (error)
	{
		console.log("error: ", error);
		res.status(400).send({ error: true, msg: error });
	}
};

// const getUsersWithJobs = async(req, res) => {
// 	const { jobId, userId } = req.body;

// 	try
// 	{
		
// 		const userWithJobs = await prisma.user.findMany({
// 			include: { jobs: { include: { rota: true }}}
// 		})

// 		if(!signUpForJob)
// 			res.status(404).send({ error: true, msg: "Cannot sign up for this role" });

// 		res.status(200).send({ sucess: true, msg: "You have signed up sucesfully!" });
// 	}
// 	catch (error)
// 	{
// 		console.log("error: ", error);
// 		res.status(400).send({ error: true, msg: error });
// 	}
// };

module.exports = { enrollForJob, getAllJobVolunteer, unenrollForJob };
