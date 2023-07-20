const express = require("express");
const fs = require("fs");
const app = express();
const port = 3000;
app.use(express.json());
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours_simple.json`)
);
app.get("/api/v1/tours", (req, res) => {
  res.status(200).json({
    status: "success",
    results: tours.length,
    data: {
      tours,
    },
  });
});
app.get("/api/v1/tours/:id", (req, res) => {
  const { id } = req.params;
  const tour = tours.find((tour) => tour.id === Number(id));
  res.status(200).json({
    status: "success",
    data: {
      tour,
    },
  });
});

app.post("/api/v1/tours", (req, res) => {
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
});
app.listen(port, () => {
  console.log("app is running on port 3000");
});
