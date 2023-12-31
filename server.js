const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

const app = require("./app");
// create a DATABASE connection string to connect to mongodb
const DB = process.env.DATABASE;
//connect to DATABASE .sercond arcument is just config
//db is hosted at liara
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("DB connection successful!"))
  .catch((err) => {
    console.log(err);
  });
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`app is running on port ${port}`);
});
