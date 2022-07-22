const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// Get all the rotas from the database
const getAllJobs = async (req, res) => {
    try {
        const jobs = await prisma.job.findMany();

        if (!jobs)
            res.status(404).send({ error: true, msg: "Cannot find this any jobs  *panic* " });

        res.status(200).send({ sucess: true, ...jobs });
    }
    catch (error) {
        console.log("error ===", error);
        res.status(400).send({ error: true, msg: error });
    }
};

// Get one Rota from the database
const getOneJob = async (req, res) => {
    const { id } = req.params;

    if (!id)
        res.status(404).send("No id?");

    const idInt = parseInt(id);

    console.log(typeof idInt);

    try {
        const job= await prisma.job.findUnique({ where: { id: idInt } });

        if(!job)
            res.status(404).send({ error: true, msg: "Cannot find this rota :'( " });

        res.status(200).send({ sucess: true, job });
    }
    catch (error) {
        console.log("error ===", error);
        res.status(400).send({ error: true, msg: error });
    }
};

// Create one Rota 
const createOneJob = async (req, res) => {


    const body = req.body;
    try {
        const createJob = await prisma.job.create({
            data: {
                body
            },
        })

        if (!createJob)
            res.status(404).send({ error: true, msg: "Cannot create a job *panic* " });

        res.status(200).send({ sucess: true, createJob });
    }
    catch (error) {
        console.log("error ===", error);
        res.status(400).send({ error: true, msg: error });
    }
};

// Update one Rota from the database
const updateJob = async (req, res) => {
    const { id } = req.params;

    if (!id)
        res.status(404).send("No id?");

    const idInt = parseInt(id);

    try {
        const job = await prisma.job.update({
            where: { id: idInt },
            data: {
                body: req.body
            }
        })


        if (!job)
            res.status(404).send({ error: true, msg: "Cannot find this rota :'( " });

        res.status(200).send({ sucess: true, job });
    }
    catch (error) {
        console.log("error ===", error);
        res.status(400).send({ error: true, msg: error });
    }
};

// Delete one Rota from the database
const deleteJob = async (req, res) => {
    const { id } = req.params;

    if (!id)
        res.status(404).send("No id?");

    const idInt = parseInt(id);

    try {
        const job = await prisma.job.delete({
            where: { id: idInt },
        })


        if (!job)
            res.status(404).send({ error: true, msg: "Cannot find this rota :'( " });

        res.status(200).send({ sucess: true, job });
    }
    catch (error) {
        console.log("error ===", error);
        res.status(400).send({ error: true, msg: error });
    }
};

module.exports = { getAllJobs, getOneJob, createOneJob, updateJob, deleteJob };