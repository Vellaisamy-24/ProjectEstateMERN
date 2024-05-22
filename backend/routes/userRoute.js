const express = require("express");
const { signUp, signIn, googleAuth } = require("../controller/userController");
const router = express.Router();
router.route("/sign-up").post(signUp);
router.route("/sign-in").post(signIn);
router.route("/googleLogin").post(googleAuth);
module.exports = router;
