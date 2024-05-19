const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  userName: {
    type: String,
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
  },
});
const User = mongoose.model("user", schema);
module.exports = User;
