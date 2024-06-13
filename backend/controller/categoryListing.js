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
exports.getSingleCategoryListingById = async (req, res) => {
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
exports.getAllCategoryListing = async (req, res) => {
  try {
    const allCategoryListing = await CategoryListing.find();
    return res.json({
      success: true,
      message: "All catgory Listing fetched",
      allCategoryListing,
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};
exports.deleteCategoryListingById = async(req,res) => {
  try {
    const id=req.params.id
    const deleteCategoryListing=await CategoryListing.findByIdAndDelete(id)
    if(!deleteCategoryListing)
        {
            return res.json({
                success:false,
                message:"id not found for delete"
            })
        }
        return res.json({
            success:true,
            message:"deleted category lisitng by id success",
            deleteCategoryListing
        })
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};
