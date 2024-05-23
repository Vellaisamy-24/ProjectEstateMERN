const express = require("express");
const {
  signUp,
  signIn,
  googleAuth,
  getUserById,
  updateUser,
} = require("../controller/userController");
const router = express.Router();
router.route("/sign-up").post(signUp);
router.route("/sign-in").post(signIn);
router.route("/googleLogin").post(googleAuth);
router.route("/getUser/:id").get(getUserById);
router.route("/updateUser/:id").put(updateUser);
module.exports = router;
