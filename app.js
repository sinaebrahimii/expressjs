const express = require("express");
const fs = require("fs");
const morgan = require("morgan");
const app = express();
const port = 3000;
// MIDDLEWEARS
app.use(morgan("dev"));
app.use(express.json());
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours_simple.json`)
);
//ROUTE HANDLERS
const getAllTours = (req, res) => {
  res.status(200).json({
    status: "success",
    results: tours.length,
    data: {
      tours,
    },
  });
};
const getTour = (req, res) => {
  const id = req.params.id * 1;
  if (id > tours.length) {
    res.status(404).json({
      status: "failed",
      message: "Inavlid ID",
    });
    return;
  }
  const tour = tours.find((tour) => tour.id === id);
  res.status(200).json({
    status: "success",
    data: {
      tour,
    },
  });
};
const createTour = (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = {
    ...req.body,
    id: newId,
  };
  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours_simple.json`,
    JSON.stringify(tours),
    (err) => {
      console.log(err);
    }
  );
  res.status(201).json({
    status: "success",
    data: {
      newTour,
    },
  });
};
const updateTour = (req, res) => {
  const id = req.params.id * 1;
  if (id > tours.length) {
    res.status(404).json({
      status: "failed",
      message: "Inavlid ID",
    });
    return;
  }
  res.json({
    status: "success",

    updatedProperties: req.body,
  });
};
const deleteTour = (req, res) => {
  const id = req.params.id * 1;
  if (id > tours.length) {
    res.status(404).json({
      status: "failed",
      message: "Inavlid ID",
    });
    return;
  }
  res.status(204).json({
    status: "success",
    message: "Deleted Tour successfuly !",
  });
};
app.get("/api/v1/tours", getAllTours);
app.get("/api/v1/tours/:id", getTour);
app.post("/api/v1/tours", createTour);
app.patch("/api/v1/tours/:id", updateTour);
app.delete("/api/v1/tours/:id", deleteTour);
app.listen(port, () => {
  console.log("app is running on port 3000");
});
