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
exports.deleteCategoryListingById = async (req, res) => {
  try {
    const id = req.params.id;
    const deleteCategoryListing = await CategoryListing.findByIdAndDelete(id);
    if (!deleteCategoryListing) {
      return res.json({
        success: false,
        message: "id not found for delete",
      });
    }
    return res.json({
      success: true,
      message: "deleted category lisitng by id success",
      deleteCategoryListing,
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};
exports.updateCategoryListingById = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(req.params.id + "id for update");
    console.log(req.body);
    const updateCategoryListing = await CategoryListing.findByIdAndUpdate(
      id,
      {
        $set: {
          name: req.body.name,
          description: req.body.name,
          address: req.body.address,
          regularPrice: req.body.regularPrice,
          discountPrice: req.body.discountPrice,
          bathRooms: req.body.bathRooms,
          bedRooms: req.body.bedRooms,
          furnished: req.body.furnished,
          parking: req.body.parking,
          offer: req.body.offer,
          rent: req.body.rent,
          sell: req.body.sell,
          images: req.body.images,
        },
      },
      {
        new: true,
      }
    );
    return res.json({
      success: true,
      message: "update categoryListing by id success",
      updateCategoryListing,
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};
exports.getCategoryListing = async (req, res) => {
  try {
    let limit = parseInt(req.query.limit) || 8;
    let startIndex = parseInt(req.query.startIndex) || 0;
    let offer = req.query.offer;
    if (offer === undefined || offer === "false") {
      offer = { $in: [false, true] };
    }
    let furnished = req.body.furnished;
    if (furnished === undefined || furnished === "false") {
      furnished = { $in: [false, true] };
    }
    let parking = req.query.parking;
    if (parking === undefined || parking === "false") {
      parking = { $in: [false, true] };
    }
    const searchTerm = req.query.searchTerm || "";
    const sort = req.query.sort || "createdAt";
    const order = req.query.order || "desc";
    const categoryListing = await CategoryListing.find({
      name: { $regex: searchTerm, $options: "i" },
      offer,
      parking,
      furnished,
    })
      .sort({ [sort]: order })
      .limit(limit)
      .skip(startIndex);
    return res.json({
      success: true,
      message: "Get Category Lisiting",
      categoryListing,
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};
