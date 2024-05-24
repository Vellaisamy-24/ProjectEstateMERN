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

exports.googleAuth = async (req, res) => {
  console.log(req.body);
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      const { password: pass, ...rest } = user._doc;
      return res.cookie("access_token", token, { httpOnly: true }).json({
        success: true,
        message: "Goolge Login Success",
        user: rest,
        token: token,
      });
    } else {
      const generatePassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generatePassword, 10);
      const newUser = await User.create({
        email: req.body.email,
        userName: req.body.userName,
        profile: req.body.profile,
        password: hashedPassword,
      });
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
      const { password: pass, ...rest } = newUser._doc;
      return res.cookie("access_token", token).json({
        success: true,
        message: "google login for new User",
        user: rest,
        token: token,
      });
    }
  } catch (error) {
    console.log(error);
  }
};
exports.updateUser = async (req, res) => {
  console.log("userid for update user", req.params.id);
  console.log("data for update user", req.body);

  try {
    const _id = req.params.id;

    const userExists = await User.findById(_id); //findOne({_id:req.params.id})
    if (!userExists) {
      return res.json({
        success: false,
        message: "User Not exists",
      });
    }
    const updateUser = await User.findByIdAndUpdate(req.params.id, {
      $set: {
        userName: req.body.userName,
        profile: req.body.profile,
        email: req.body.email,
        city: req.body.city,
        postalCode: req.body.postalCode,
        address: req.body.address,
        phone: req.body.phone,
        country: req.body.country,
        state: req.body.state,
      },
    });
    return res.json({
      success: true,
      message: "user Update success",
    });
  } catch (error) {
    console.log(error);
  }
};
exports.getUserById = async (req, res) => {
  console.log("userInfo with id", req.params.id);
  try {
    const userExists = await User.findOne({ _id: req.params.id });
    if (!userExists) {
      return res.json({
        success: false,
        message: "User not exists",
      });
    }
    return res.json({
      success: true,
      user: userExists,
      message: "User info get success",
    });
  } catch (error) {
    console.log(error);
  }
};
exports.deleteUserAccount = async (req, res) => {
  console.log(req.params.id);
  try {
    const userExists = await User.findById(req.params.id);
    if (!userExists) {
      return res.json({
        success: false,
        message: "User id not exitst",
      });
    }
    const deleteUser = await User.findByIdAndDelete(req.params.id);
    return res.json({
      success: true,
      message: "User Account Deleted",
      deleteUser,
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};
