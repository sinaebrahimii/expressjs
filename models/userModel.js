const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
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
    select: false,
  },
  photo: {
    type: String,
  },
});
userScehma.pre("save", async function (next) {
  //only runs if password is modified
  if (!this.isModified()) return next();
  //hashes the password
  this.password = await bcrypt.hash(this.password, 10);
  // deletes the confirmed password
  // this.confirmPassword = undefined;
  next();
});
// userScehma.methods.comaprePassword = async function (
//   candidatePassword,
//   userPassword,
//   next
// ) {
//   next();
//   return await bcrypt.compare(candidatePassword, userPassword);
// };
const User = mongoose.model("User", userScehma);
module.exports = User;
