const express = require("express");
const tourController = require("../controllers/tourController");
const {
  getAllTours,
  createTour,
  getTour,
  updateTour,
  deleteTour,
  checkID,
  checkBody,
} = tourController;
const router = express.Router();
//This middlewear checks every request with id params for this route
// router.param("id", checkID);

router.route("/").get(getAllTours).post(createTour);
router.route("/:id").get(getTour).patch(updateTour).delete(deleteTour);
module.exports = router;
