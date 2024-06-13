const express = require("express");
const { createCategoryListing } = require("../controller/categoryListing");
const router = express.Router();
router.route("/createCategoryListing").post(createCategoryListing);
module.exports = router;
