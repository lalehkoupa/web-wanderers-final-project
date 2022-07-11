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
app.get("/dates", (req, res) => {
  let ne = jobs.filter(
    (item, index) => item[index].date !== item[index + 1].date
  );
  console.log(ne);
  res.status(200).json(jobs);
});

app.post("/rota", (req, res) => {
  const { title, startDate, endDate, openSpots } = req.body;
  const newRota = {
    class: title,
    startDate,
    endDate,
    openSpots,
  };

  if (
    title === "" ||
    startDate === "" ||
    endDate === "" ||
    openSpots === "" ||
    !Number.isInteger(openSpots) ||
    Number.isInteger(title)
  ) {
    res
      .status(400)
      .json({ success: false, message: "Please check/fill in all fields!" });
  } else {
    rota.push(newRota);
    res.status(200).json({ success: true, message: "New class added!" });
  }
});

app.listen(port, () => console.log(`Listening on port ${port}`));
