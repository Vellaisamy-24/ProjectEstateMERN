const express = require("express");
const mongoose = require("mongoose");
const app = express();
app.use(express.json());
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config({});
app.use(cors());
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((error) => {
    console.log(error);
  });
const userRoute = require("./routes/userRoute");
app.use("/api/user", userRoute);
app.listen(5000, (req, res) => {
  console.log("app is listening to 5000");
});
