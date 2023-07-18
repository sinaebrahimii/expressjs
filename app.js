const express = require("express");
const app = express();
const port = 3000;
app.get("/", (req, res) => {
  res.status(200).send("hello from server!!");
});
app.get("/mame", (req, res) => {
  res.status(200).send("no mame for you");
});
app.listen(port, () => {
  console.log("app is running on port 3000");
});
