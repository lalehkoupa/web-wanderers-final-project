const express = require("express");

const {
  enrollForJob,
  getAllJobVolunteer,
  unenrollForJob,
} = require("../controllers/enroll.ts");
const { dateList,getAllJob, getJob } = require("../controllers/job.ts");

const { loginUser, registerUser } = require("../controllers/auth.ts");

const router = express.Router();

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