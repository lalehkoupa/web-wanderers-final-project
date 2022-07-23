const express = require("express");
const { 
	getAllRotas, 
	getOneRota, 
	createOneRota, 
	updateRota, 
	deleteRota 
} = require("../controllers/rota.ts");

const { 
	getAllJobs, 
	getOneJob, 
	createOneJob, 
	updateJob, 
	dateList,
	getAllJob, 
	getJob,
	deleteJob 
} = require("../controllers/job.ts");

	const {
		enrollForJob,
		getAllJobVolunteer,
		unenrollForJob,
	} = require("../controllers/enroll.ts");

	const { loginUser, registerUser } = require("../controllers/auth.ts");

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

router.get("/hello", (req, res) => res.send("API alive!"));

router.route("/login").post(loginUser);
router.route("/signup").post(registerUser);

router.route("/dates").get(dateList);
router.route("/job").get(getAllJob);
router.route("/job/:id").get(getJob);
router.route("/jobVolunteer").get(getAllJobVolunteer);
router.route("/enroll").post(enrollForJob);
router.route("/enroll").delete(unenrollForJob);

module.exports = router;