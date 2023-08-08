const mongoose = require("mongoose");
const validator = require("validator");
const userScehma = mongoose.Schema({
  name: {
    required: true,
    type: String,
  },
  email: {
    type: String,
    required: [true, "Please Provide an Email address"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "email is not valid"],
  },
  password: {
    type: String,
    required: [true, "Please Provide a password"],
    minlength: 8,
  },
  confirmPassword: {
    type: String,
    required: [true, "Please Confirm Your Password"],
  },
  photo: {
    type: String,
  },
});
const User = mongoose.model("User", userScehma);
module.exports = User;
