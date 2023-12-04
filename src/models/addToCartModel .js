// donation.mjs
import mongoose from 'mongoose';

const addToCartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  name: {
    type: String,
    required: [true, "name is required!"],
  },
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
  price: {
    type: String,
    required: false,
  },
  quantity: {
    type: String,
    required: false,
  },
  img: {
    type: String,
    required: [true, "img name is required!"],
  },
  paymentConfirm: {
    type: String,
    required: false,
  }
});

const addToCartModel = mongoose.model('addToCart', addToCartSchema);

export default addToCartModel;
