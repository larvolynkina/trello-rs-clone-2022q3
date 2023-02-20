import mongoose from 'mongoose';

const boardModel = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    backgroundColor: {
      type: String,
      default: '',
    },
    backgroundImage: {
      type: String,
      default: '',
    },
    archived: {
      type: Boolean,
      default: false,
    },
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    columns: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Column',
      },
    ],
    marks: [
      {
        color: {
          type: String,
          required: true,
        },
        text: {
          type: String,
          default: '',
        },
      },
    ],
    activities: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
        },
        action: {
          type: String,
        },
        date: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },

  { timestamps: true },
);

export default mongoose.model('Board', boardModel);
