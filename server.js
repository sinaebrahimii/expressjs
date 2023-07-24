const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

const app = require("./app");
// create a DATABASE connection string to connect to mongodb
const DB = process.env.DATABASE.replace("<password>", process.env.PASSWORD);
//connect to DATABASE .sercond arcument is just config
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("DB connection successful!"));
const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A tour must have name"],
    unique: true,
  },
  rating: {
    type: Number,
    default: 4.5,
  },
  price: {
    type: Number,
    required: [true, "A tour must have price"],
  },
});
const Tour = mongoose.model("Tour", tourSchema);
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("app is running on port 3000");
});
