const express = require("express");
const {
  getAllUsers,
  createUser,
  updateUser,
  getUser,
  deleteUser,
} = require("../controllers/userController");
const {
  protect,
  restrictTo,
  forgotPassword,
  resetPassword,
  logIn,
  signUp,
} = require("../controllers/authController");
const router = express.Router();
router.route("/signup").post(signUp);
router.route("/login").post(logIn);
router.route("/").get(getAllUsers).post(createUser);
router
  .route("/:id")
  .get(getUser)
  .patch(updateUser)
  .delete(protect, restrictTo("admin", "lead-guide"), deleteUser);
module.exports = router;
