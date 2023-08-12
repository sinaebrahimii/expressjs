const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
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
    // this on;y works on save and create
    validate: {
      validator: function (el) {
        return this.password === el;
      },
      message: "Passwords are not the same!",
    },
  },
  photo: {
    type: String,
  },
});
userScehma.pre("save", async function (next) {
  //only runs if password is modified
  if (!this.isModified) return next();
  //hashes the password
  this.password = await bcrypt.hash(this.password, 10);
  // deletes the confirmed password
  this.confirmPassword = undefined;
  next();
});
const User = mongoose.model("User", userScehma);
module.exports = User;
