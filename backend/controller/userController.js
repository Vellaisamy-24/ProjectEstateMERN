const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
exports.signUp = async (req, res) => {
  try {
    //console.log(req.body);
    const { userName, email, password } = req.body;
    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Please fill email",
      });
    }
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }
    const hashedPassword = bcryptjs.hashSync(password, 10);
    const user = await User.create({
      userName,
      email,
      password: hashedPassword,
    });
    return res.status(200).json({
      success: true,
      message: "User signup succes",
      user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
exports.signIn = async (req, res) => {
  console.log(req.body);
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.json({
        success: false,
        message: "Please enter all fields",
      });
    }
    const userExists = await User.findOne({ email });
    if (!userExists) {
      return res.json({
        success: false,
        message: "User not exits",
      });
    }
    const validPassword = bcryptjs.compare(password, userExists.password);
    if (!validPassword) {
      return res.json({
        success: false,
        message: "Invalid Password",
      });
    }
    const token = jwt.sign({ id: userExists._id }, process.env.JWT_SECRET);
    console.log(token);
    const { password: pass, ...rest } = userExists._doc;
    return res.cookie("acces_token", token, { httpOnly: true }).json({
      success: true,
      message: "User login success",
      user: rest,
      token: token,
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};
