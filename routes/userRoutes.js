const express = require("express");
const userController = require("../controllers/userController");
const { getAllUsers, createUser, updateUser, getUser, deleteUser } =
  userController;
const { signUp } = require("../controllers/authController");
const router = express.Router();
router.route("/signup").post(signUp);
router.route("/").get(getAllUsers).post(createUser);
router.route("/:id").get(getUser).patch(updateUser).delete(deleteUser);
module.exports = router;
