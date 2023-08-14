const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
exports.signUp = async (req, res, next) => {
  try {
    const { name, email, password, confirmPassowrd } = req.body;
    const newUser = await User.create({
      name,
      email,
      password,
      confirmPassowrd,
    });
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_AT,
    });
    res.status(201).json({
      status: "success",
      token,
      data: {
        newUser,
      },
    });
  } catch (error) {
    res.status(404).json({ status: "failed", error });
  }
};
exports.logIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    //check if email and password exists:
    if (!password || !email) {
      return res.status(400).json({
        status: "failed",
        message: "please provide email and password",
      });
    }
    // check if user does not exist or password is not correct:
    const user = await User.findOne({ email }).select("+password");
    //selects the password withour excluding other fields.
    const correct = await bcrypt.compare(password, user.password);
    if (!user || !correct) {
      return res.status(401).json({
        status: "failed",
        message: "Incorrect username or password",
      });
    }
    console.log(user);
    const token = "";
    res.status(200).json({
      status: "success",
      data: {
        email,
        token,
      },
    });
  } catch (error) {}
};
