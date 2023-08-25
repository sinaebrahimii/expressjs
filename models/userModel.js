const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const validator = require("validator");
const crypto = require("crypto");
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
  role: {
    type: String,
    enum: ["user", "guide", "lead-guide", "admin"],
    default: "user",
  },
  password: {
    type: String,
    required: [true, "Please Provide a password"],
    minlength: 8,
    select: false,
  },
  passwordResetToken: {
    type: String,
  },
  passwordResetExpires: Date,
  photo: {
    type: String,
  },
});
userScehma.pre("save", async function (next) {
  //only runs if password is modified
  if (!this.isModified()) return next();
  console.log("mame");

  try {
    //hashes the password
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  } catch (error) {
    next();
  }

  next();
});
userScehma.methods.createPasswordResetToken = function () {
  // creates reset token and then hash and store it in resetpassword field
  const resetToken = crypto.randomBytes(32).toString("hex");
  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  //ads 10 minutes to expire date
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
  return resetToken;
};
const User = mongoose.model("User", userScehma);
module.exports = User;
