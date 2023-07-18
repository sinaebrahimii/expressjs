const express = require("express");
const app = express();
const port = 3000;
app.get("/", (req, res) => {
  const obj = { message: "hello world!" };
  res.status(200).json(obj);
});
app.get("/mame", (req, res) => {
  res.status(200).send("no mame for you");
});
app.post("/", (req, res) => {
  res.json({ message: "hi" });
});
app.listen(port, () => {
  console.log("app is running on port 3000");
});
