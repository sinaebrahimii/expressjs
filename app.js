const express = require("express");
const morgan = require("morgan");
const toursRoute = require("./routes/tourRoutes");
const usersRoute = require("./routes/userRoutes");
const app = express();
// MIDDLEWEARS
app.use(morgan("dev"));
app.use(express.json());

//ROUTES
app.use("/api/v1/tours", toursRoute);
app.use("/api/v1/users", usersRoute);

module.exports = app;
