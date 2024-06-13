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
exports.getCategoryListingById = async (req, res) => {
  try {
    const id = req.params.id;
    const categoryListingById = await CategoryListing.findById(id);
    if (!categoryListingById) {
      return res.json({
        success: false,
        message: "lisitng by id not found",
      });
    }
    return res.json({
      success: true,
      categoryListingById,
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};
