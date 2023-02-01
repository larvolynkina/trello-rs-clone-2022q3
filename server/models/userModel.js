import mongoose from 'mongoose';

const userModel = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatarColor: {
      type: String,
      required: true,
    },
    avatarImage: {
      type: String,
      default: '',
    },
  },
  { timestamps: true },
);

export default mongoose.model('User', userModel);