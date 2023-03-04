import mongoose from 'mongoose';

const userModel = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
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
    },
    avatarImage: {
      type: String,
      default: '',
    },
    workspaces: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Workspace',
      },
    ],
  },
  { timestamps: true },
);

export default mongoose.model('User', userModel);
