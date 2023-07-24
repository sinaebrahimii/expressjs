const fs = require("fs");
const path = require("path");
const filePath = path.join(__dirname, "/../dev-data/data/tours_simple.json");
const tours = JSON.parse(fs.readFileSync(filePath));
`${__dirname}/dev-data/data/tours_simple.json`;
exports.checkID = (req, res, next, value) => {
  console.log(`ID:${value}`);
  const id = req.params.id * 1;
  if (id > tours.length) {
    res.status(404).json({
      status: "failed",
      message: "Inavlid ID -_-",
    });
    return;
  }
  next();
};
exports.checkBody = (req, res, next) => {
  if (!req.body.name || !req.body.price || req.body.name.trim().length === 0) {
    return res
      .status(400)
      .json({ status: "failed", message: "Missing Name or Price" });
  }
  next();
};
exports.getAllTours = (req, res) => {
  res.status(200).json({
    status: "success",
    results: tours.length,
    data: {
      tours,
    },
  });
};
exports.getTour = (req, res) => {
  const id = req.params.id * 1;
  const tour = tours.find((tour) => tour.id === id);
  res.status(200).json({
    status: "success",
    data: {
      tour,
    },
  });
};
exports.createTour = (req, res) => {
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
exports.updateTour = (req, res) => {
  res.json({
    status: "success",

    updatedProperties: req.body,
  });
};
exports.deleteTour = (req, res) => {
  res.json({ status: "success" });
};
