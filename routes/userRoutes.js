const express = require("express");
const userController = require("../controllers/userController");
const { getAllUsers, createUser, updateUser, getUser, deleteUser } =
  userController;
const { signUp, logIn } = require("../controllers/authController");
const router = express.Router();
router.route("/signup").post(signUp);
router.route("/login").post(logIn);
router.route("/").get(getAllUsers).post(createUser);
router.route("/:id").get(getUser).patch(updateUser).delete(deleteUser);
module.exports = router;
