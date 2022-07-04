const express = require("express");
const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());

const jobs = require("./exampleJobs.json");
const rota = require("./exampleRota.json");

app.get("/api", (req, res) => {
  res.status(200).json({ success: true, msg: "I'm alive!!!" });
});
app.get("/jobs", (req, res) => {
  res.status(200).json(jobs);
});
app.get("/rota", (req, res) => {
  res.status(200).json(rota);
});

app.listen(port, () => console.log(`Listening on port ${port}`));
