const express = require("express");
const fs = require("fs");

const router = express.Router();
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours_simple.json`)
);
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
  res.json({ status: "success" });
};

router.route("/").get(getAllTours).post(createTour);
router.route("/:id").get(getTour).patch(updateTour).delete(deleteTour);
module.exports = router;
