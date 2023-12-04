import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  created_at: {
    type: Date,
    required: true,
    default: Date.now,
  },
  password: {
    type: String,
    required: true,
  },
  resetPasswordExpires: {
    type: Date,
    default: null,
  },
  updated_at: {
    type: Date,
    required: true,
    default: Date.now,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: false,
  },
  customarId: {
    type: String,
    required: false,
  },
  phone: {
    type: String,
    required: false,
  },
  address: {
    type: String,
    required: false,
  },
  role: {
    type: String,
    default: "USER",
    enum: [
      "SUPER-ADMIN",
      "ADMIN",
      "USER"
    ],
  }
});

const UserModel = mongoose.model("user", userSchema);

export default UserModel;
