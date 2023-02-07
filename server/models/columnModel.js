import mongoose from 'mongoose';

const columnModel = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    archived: {
      type: Boolean,
      default: false,
    },
    cards: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Card',
      },
    ],
  },

  { timestamps: true },
);

export default mongoose.model('Column', columnModel);
