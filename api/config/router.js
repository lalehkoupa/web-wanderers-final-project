const express = require("express");
const { getAllRotas, getOneRota } = require("../controllers/rota.ts");

const router = express.Router();

router.route("/hello", (req, res) => res.send("API alive!"));

router.route("/rota")
.get(getAllRotas);

router.route("/rota/:id")
.get(getOneRota);

module.exports = router;