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
  profile: {
    type: String,
  },
  address: {
    type: String,
  },
  postalCode: {
    type: Number,
  },
  phone: {
    type: Number,
  },
  city: {
    type: String,
  },
  country: {
    type: String,
  },
  state: {
    type: String,
  },
});
const User = mongoose.model("user", schema);
module.exports = User;
