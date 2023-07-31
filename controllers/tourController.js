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
class APIFeatures {
  constructor(query, queryString) {
    (this.query = query), (this.queryString = queryString);
  }
  filter() {
    const queryObj = { ...this.queryString };
    const excludedFields = ["page", "sort", "limit", "fields"];
    excludedFields.forEach((el) => delete queryObj[el]);
    this.query = this.query.find(queryObj);
    return this;
  }
  sort() {
    if (this.queryString.sort) {
      //splitting queries and joining them by ' '
      //sort method needs to accepet {duration ratingsAverage}
      const sortBy = this.queryString.sort.split(",").join(" ");
      this.query = this.query.sort(sortBy);
    }
    return this;
  }
  limit() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(",").join(" ");
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select("-_-v");
    }
    return this;
  }
  paginate() {
    // pagination
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 100;
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
}
exports.getAllTours = async (req, res) => {
  try {
    // const queryObj = { ...req.query };
    // const excludedFields = ["page", "sort", "limit", "fields"];
    // excludedFields.forEach((el) => delete queryObj[el]);
    //this method returns a query object and we can chain method on it for more queries
    // const query = Tour.find(queryObj);
    //sorting feature
    // if (req.query.sort) {
    //   //splitting queries and joining them by ' '
    //   //sort method needs to accepet {duration ratingsAverage}
    //   const sortBy = req.query.sort.split(",").join(" ");
    //   query.sort(sortBy);
    // }
    // fileds limitting
    // if (req.query.fields) {
    //   const fields = req.query.fields.split(",").join(" ");
    //   query.select(fields);
    // } else {
    //   query.select("-_-v");
    // }
    // pagination
    // const page = req.query.page * 1 || 1;
    // const limit = req.query.limit * 1 || 100;
    // const skip = (page - 1) * limit;
    // query.skip(skip).limit(limit);
    const features = new APIFeatures(Tour.find(), req.query)
      .filter()
      .limit()
      .sort()
      .paginate();
    const tours = await features.query;

    res.status(200).json({
      status: "success",
      results: tours.length,
      data: {
        tours,
      },
    });
  } catch (err) {
    res.status(404).json({ status: "falied", message: err });
  }
};
exports.getTour = async (req, res) => {
  // finding a single tour using mongoose
  try {
    const tour = await Tour.findById(req.params.id);
    // Tours.findOne({id:req.params.id})
    res.status(200).json({
      status: "success",
      data: {
        tour,
      },
    });
  } catch (err) {
    res.status(404).json({ status: "failed", message: err });
  }
};
exports.createTour = async (req, res) => {
  const { name, rating, price } = req.body;
  // creates new tour with mongoose model
  try {
    const newTour = await Tour.create(req.body);
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
exports.updateTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(201).json({
      status: "success",
      data: {
        tour,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "failed",
      message: err,
    });
  }
};
exports.deleteTour = async (req, res) => {
  try {
    await Tour.findByIdAndDelete(req.params.id);
    res.status(204).json({ status: "success" });
  } catch (err) {
    req.status(404).json({ status: "failed", message: err });
  }
};
