import mongoose from "mongoose";

const productsSchema = new mongoose.Schema({
  created_at: {
    type: Date,
    required: true,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    required: true,
    default: Date.now,
  },
  name: {
    type: String,
    required: [true, "name id required!"],
  },
  dis: {
    type: String,
    required: [true, "dis id required!"],
  },
  image: {
    type: String,
    required: [true, "product Picture id required!"],
  },
  price: {
    type: String,
    required: [true, "price id required!"],
  },
  regPrice: {
    type: String,
    required: [true, "regPrice id required!"],
  },
  instructor: {
    type: String,
    required: [true, "instructor id required!"],
  },
  enrollmentStatus: {
    type: String,
    required: [true, "status id required!"],
  },
  thumbnail: {
    type: String,
    required: [true, "thumbnail id required!"],
  },
  duration: {
    type: String,
    required: [true, "duration id required!"],
  },
  schedule: {
    type: String,
    required: [true, "schedule id required!"],
  },
  location: {
    type: String,
    required: [true, "location id required!"],
  },
});

const ProductsModel = mongoose.model("product", productsSchema);

export default ProductsModel;
