const express = require("express");
const fs = require("fs");
const app = express();
const port = 3000;
const tours = fs.readFileSync(`${__dirname}/dev-data/tours_simple.json`);
app.get("/api/tours", (req, res) => {
  const obj = { message: "hello world!" };
  res.status(200).json(obj);
});

app.post("/", (req, res) => {
  res.json({ message: "hi" });
});
app.listen(port, () => {
  console.log("app is running on port 3000");
});
