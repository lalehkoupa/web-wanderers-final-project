import express from "express";
import { router } from "./config/router";

const app = express();
const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Api alive");
});

app.use("/api", router);

app.listen(port, () => console.log(`Listening on port ${port}`));
