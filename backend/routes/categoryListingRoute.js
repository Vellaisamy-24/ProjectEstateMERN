const express = require("express");
const {
  getSingleCategoryListingById,
  createCategoryListing,
  getAllCategoryListing,
  deleteCategoryListingById,
  updateCategoryListingById,
  getCategoryListing,
  getUserCategoryListing,
  deleteAllListingData,
} = require("../controller/categoryListing");
const router = express.Router();
router.route("/createCategoryListing").post(createCategoryListing);
router
  .route("/getSingleCategoryListingById/:id")
  .get(getSingleCategoryListingById);
router.route("/getAllCategoryListing").get(getAllCategoryListing);
router
  .route("/deleteCategoryListingById/:id")
  .delete(deleteCategoryListingById);
module.exports = router;
router.route("/updateCategoryListingById/:id").put(updateCategoryListingById);
router.route("/getCategoryListing").get(getCategoryListing);
router.route("/getUserCategoryListing/:id").get(getUserCategoryListing);
router.route("/delteAllListingData").delete(deleteAllListingData);
