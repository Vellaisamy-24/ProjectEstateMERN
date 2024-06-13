const express = require("express");
const {
  getCategoryListingById,
  createCategoryListing,
} = require("../controller/categoryListing");
const router = express.Router();
router.route("/createCategoryListing").post(createCategoryListing);
router.route("/getCategoryListingById/:id").get(getCategoryListingById);
module.exports = router;
