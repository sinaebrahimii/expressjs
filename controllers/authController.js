const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
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
      toekn,
      data: {
        newUser,
      },
    });
  } catch (error) {
    res.status(404).json({ status: "failed", error });
  }
};
