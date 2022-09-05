import express from "express";
// import  { Request, Response } from "express";

import bodyParser from "body-parser";
import cors from "cors";

import { router } from "./config/router";


const port = process.env.PORT || 4000;

const app = express();

app.use(cors());
app.use(express.json());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req: any, res: any) => res.send("I'm alive!"));

// Route to all of our api routes.
app.use("/api", router);

app.listen(port, () => console.log(`Listening on port ${port}`));
