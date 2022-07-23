const express = require("express");

const {
	getAllRotas,
	getOneRota,
	createOneRota,
	updateRota,
	deleteRota
} = require("../controllers/rota");

const {
	dateList,
	getAllJob,
	getJob,
} = require("../controllers/job");

const {
	enrollForJob,
	getAllJobVolunteer,
	unenrollForJob,
} = require("../controllers/enroll");

const { loginUser, registerUser } = require("../controllers/auth");

const router = express.Router();

router.route("/hello", (req, res) => res.send("API alive!"));

// Rota
router.route("/rota")
.get(getAllRotas)
.post(createOneRota)
.patch(updateRota)
.delete(deleteRota);

router.route("/rota/:id")
.get(getOneRota);

// Jobs
router.route("/dates").get(dateList);
router.route("/job").get(getAllJob);
router.route("/job/:id").get(getJob);
router.route("/jobVolunteer").get(getAllJobVolunteer);
router.route("/enroll").post(enrollForJob);
router.route("/enroll").delete(unenrollForJob);

// Auth
router.route("/login").post(loginUser);
router.route("/signup").post(registerUser);

module.exports = router;