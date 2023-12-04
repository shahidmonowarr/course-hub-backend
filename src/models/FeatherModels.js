import mongoose from "mongoose";

const featherSchema = new mongoose.Schema({
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
  featherName: {
    type: String,
    required: [true, "featherName id required!"],
  },
  featherPhoto: {
    type: String,
    required: [true, "featherPhoto id required!"],
  },
  dis: {
    type: String,
    required: [true, "dis id required!"],
  },
});

const FeatherModel = mongoose.model("feather", featherSchema);

export default FeatherModel;
