const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { promisify } = require("util");
//this function creates token
const signToken = (userID) => {
  return jwt.sign({ id: userID }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_AT,
  });
};
exports.signUp = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;
    const newUser = await User.create({
      name,
      email,
      password,
      role,
    });
    const token = signToken(newUser._id);
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
    const token = signToken(user._id);
    res.status(200).json({
      status: "success",
      data: {
        email,
        token,
      },
    });
  } catch (error) {
    res.status(404).json({ status: "failed", message: error });
  }
};
exports.protect = async (req, res, next) => {
  //1-Check for the token
  //if there is valid token ,get the token.
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  console.log(token);
  //if there is not a token send error
  if (!token) {
    return next(
      res.status(401).json({
        status: "failed",
        message: "You are not logged in please log in",
      })
    );
  }
  //2-verify the token
  try {
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    //3-Check if the user still exists
    const freshUser = await User.findById(decoded.id);
    req.user = freshUser;
    if (!freshUser) {
      res
        .status(401)
        .json({ status: "failed", message: "There is not a  user" });
      return next();
    }
  } catch (error) {
    return next(
      res.status(401).json({
        status: "failed",
        message: error,
      })
    );
  }
  next();
};
exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      next(
        res.status(403).json({
          status: "failed",
          message: `You don't have premission to perform this action`,
        })
      );
    }
    next();
  };
};
