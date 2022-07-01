const express = require("express");
const app = express();
const port = process.env.PORT || 4000;

app.use(express.json())

app.get("/api", (req, res) => 
{
  res.status(200)
	.json({ success: true, msg: "I'm alive!!!" });
})

app.listen(port, () => console.log(`Listening on port ${port}`));