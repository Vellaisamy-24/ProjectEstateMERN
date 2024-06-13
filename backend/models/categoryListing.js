const mongoose = require("mongoose");
const schema = new mongoose.Schema({
  userRef: {
    id: String,
    email: String,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  regularPrice: {
    type: Number,
  },
  discountPrice: {
    type: Number,
  },
  bathRooms: {
    type: Number,
  },
  bedRooms: {
    type: Number,
  },
  furnished: {
    type: Boolean,
  },
  offer: {
    type: Boolean,
  },
  rent: {
    type: Boolean,
  },
  parking: {
    type: Boolean,
  },
  sell: {
    type: Boolean,
  },
  images: {
    type: Array,
  },
},
{
  timestamps:true
});
const CategoryListing=mongoose.model('categoryListing',schema)
module.exports=CategoryListing
