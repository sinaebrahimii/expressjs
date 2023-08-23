const express = require("express");
const {
  getAllUsers,
  createUser,
  updateUser,
  getUser,
  deleteUser,
} = require("../controllers/userController");
const { protect, restrictTo } = require("../controllers/authController");
const authController = require("../controllers/authController");
const router = express.Router();
router.route("/signup").post(authController.signUp);
router.route("/login").post(authController.logIn);
router.route("/").get(getAllUsers).post(createUser);
router
  .route("/:id")
  .get(getUser)
  .patch(updateUser)
  .delete(protect, restrictTo("admin", "lead-guide"), deleteUser);
module.exports = router;
