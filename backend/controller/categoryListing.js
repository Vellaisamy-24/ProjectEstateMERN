const CategoryListing = require("../models/categoryListing");
exports.createCategoryListing = async (req, res) => {
  try {
    const data = req.body;
    const categoryListingData = await CategoryListing.create(data);
    return res.json({
      success: true,
      message: "Cateogry Listing Data Crated",
      categoryListingData,
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};
