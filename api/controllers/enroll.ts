const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// Get all the enroll volunteers
const getAllJobVolunteer = async (req, res) => {
  try {
    const rotas = await prisma.rota.findMany();

    if (!rotas)
      res
        .status(404)
        .send({ error: true, msg: "Cannot find this any rotas *panic* " });

    res.status(200).send({ sucess: true, ...rotas });
  } catch (error) {
    console.log("error ===", error);
    res.status(400).send({ error: true, msg: error });
  }
};

const unenrollForJob = async (req, res) => {
  try {
    const rotas = await prisma.rota.findMany();

    if (!rotas)
      res
        .status(404)
        .send({ error: true, msg: "Cannot find this any rotas *panic* " });

    res.status(200).send({ sucess: true, ...rotas });
  } catch (error) {
    console.log("error ===", error);
    res.status(400).send({ error: true, msg: error });
  }
};
const enrollForJob = async (req, res) => {
  try {
    const rotas = await prisma.rota.findMany();

    if (!rotas)
      res
        .status(404)
        .send({ error: true, msg: "Cannot find this any rotas *panic* " });

    res.status(200).send({ sucess: true, ...rotas });
  } catch (error) {
    console.log("error ===", error);
    res.status(400).send({ error: true, msg: error });
  }
};

module.exports = { enrollForJob, getAllJobVolunteer, unenrollForJob };
