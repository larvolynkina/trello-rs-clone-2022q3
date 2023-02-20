import mongoose from 'mongoose';

const workspaceModel = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    shortTitle: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      default: '',
    },
    websiteAddress: {
      type: String,
      default: '',
    },
    avatarColor: {
      type: String,
      required: true,
    },
    avatarImage: {
      type: String,
      default: '',
    },
    private: {
        type: Boolean,
        default: true,
    },
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    boards: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Board',
      },
    ],
  },
  { timestamps: true },
);

export default mongoose.model('Workspace', workspaceModel);
