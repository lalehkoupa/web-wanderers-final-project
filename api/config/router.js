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

// router.route("/hello", (req, res) => res.send("API alive!"));

// Rota
router.route("/rota")
.get(getAllRotas);
router.route("/rota")
.post(createOneRota);
router.route("/rota")
.patch(updateRota);
router.route("/rota")
.delete(deleteRota);
router.route("/rota/:id")
.get(getOneRota);

router.route("/login").post(loginUser);
router.route("/signup").post(registerUser);

router.route("/dates").get(dateList);
router.route("/job").get(getAllJob);
router.route("/job/:id").get(getJob);
router.route("/jobVolunteer").get(getAllJobVolunteer);
router.route("/enroll").post(enrollForJob);
router.route("/enroll").delete(unenrollForJob);

module.exports = router;