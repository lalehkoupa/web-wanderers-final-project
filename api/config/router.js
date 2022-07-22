const express = require("express");
const { getAllRotas, getOneRota, createOneRota, updateRota, deleteRota } = require("../controllers/rota.ts");
const { getAllJobs, getOneJob, createOneJob, updateJob, deleteJob } = require("../controllers/job.ts");

const router = express.Router();

router.route("/hello", (req, res) => res.send("API alive!"));
// Rota
router.route("/rota")
.get(getAllRotas);
router.route("/rota")
.post(createOneRota);
router.route("/rota")
.update(updateRota);
router.route("/rota")
.delete(deleteRota);
router.route("/rota/:id")
.get(getOneRota);

// Jobs 
router.route("/job")
.get(getAllJobs);
router.route("/rota")
.post(createOneJob);
router.route("/job")
.update(updateJob);
router.route("/job")
.delete(deleteJob);
router.route("/job/:id")
.get(getOneJob);

module.exports = router;