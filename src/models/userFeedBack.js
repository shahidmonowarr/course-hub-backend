import mongoose from 'mongoose';

const userFeedBacktSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "name is required!"],
  },
  email: {
    type: String,
    required: [true, "email is required!"],
  },
  comment: {
    type: String,
    required: [true, "comment is required!"],
  },
  suggestions: {
    type: String,
    required: [true, "Suggestions is required!"],
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
  }
});

const UserFeedBacktModel = mongoose.model('userFeedBack', userFeedBacktSchema);

export default UserFeedBacktModel;
