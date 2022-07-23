const express = require("express");
const app = express();
const port = process.env.PORT || 4000;
const router = require("./config/router");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const jobs = require("./exampleJobs.json");
const rota = require("./exampleRota.json");

app.get("/", (req, res) => res.send("I'm alive!"));

// Route to all of our api routes.
app.use("/api", router);

app.get("/jobs", (req, res) => {
	res.status(200).json(jobs);
});
app.get("/rota", (req, res) => {
	res.status(200).json(rota);
});

/* for rota page to send different dates and the sum of availabe spaces*/

app.get("/dates", (req, res) => {
	const filteredArray = [];

	jobs.map((item) => {
		filteredArray.push(
			(({ date, availableSpots }) => ({ date, availableSpots }))(item)
		);
	});
	const sumObject = {};

	filteredArray.map((item) => {
		if(sumObject.hasOwnProperty(item.date)) {
			sumObject[item.date] =
        parseInt(sumObject[item.date]) + parseInt(item.availableSpots);
		} else {
			sumObject[item.date] = item.availableSpots;
		}
	});
	const sumArray = [];

	for(let key in sumObject)
		sumArray.push({ date: key, availableSpots: sumObject[key] });

	res.json(sumArray);
});

app.post("/rota", (req, res) => {
	const { title, startDate, endDate, openSpots } = req.body;
	const newRota = {
		class: title,
		startDate,
		endDate,
		openSpots,
	};

	if(
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
