const express = require("express");
const {
  getSingleCategoryListingById,
  createCategoryListing,
  getAllCategoryListing,
  deleteCategoryListingById,
} = require("../controller/categoryListing");
const router = express.Router();
router.route("/createCategoryListing").post(createCategoryListing);
router.route("/getSingleCategoryListingById/:id").get(getSingleCategoryListingById);
router.route("/getAllCategoryListing").get(getAllCategoryListing);
router.route("/deleteCategoryListingById/:id").delete(deleteCategoryListingById);
module.exports = router;
