const Tour = require("../models/tourModel");

// dosen't need it anymore mongo db will check for ID validation
// a middle wear to check ID validation
// exports.checkID = (req, res, next, value) => {
//   console.log(`ID:${value}`);
//   const id = req.params.id * 1;
//   if (id > tours.length) {
//     res.status(404).json({
//       status: "failed",
//       message: "Inavlid ID -_-",
//     });
//     return;
//   }
//   next();
// };
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
exports.createTour = async (req, res) => {
  const { name, rating, price } = req.body;
  try {
    const newTour = await Tour.create({
      name,
      rating,
      price,
    });
    res.status(201).json({
      status: "success",
      data: {
        newTour,
      },
    });
  } catch (err) {
    res.status(400).json({ status: "failed", message: err });
  }
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
