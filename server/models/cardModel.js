import mongoose from 'mongoose';

const cardModel = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: '',
    },
    position: {
      type: Number,
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
    marks: [
      {
        type: mongoose.Schema.Types.ObjectId,
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
    attachments: [
      {
        type: {
          type: String,
          enum: ['link', 'file'],
        },
        url: {
          type: String,
          required: true,
        },
        name: {
          type: String,
          required: true,
        },
        date: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    coverColor: {
      type: String,
      default: '',
    },
    coverImg: {
      type: String,
      default: '',
    },
    coverSize: {
      type: String,
      enum: ['normal', 'full'],
      default: 'normal',
    },
    checklists: [
      {
        title: {
          type: String,
          required: true,
        },
        checkItems: [
          {
            title: {
              type: String,
              required: true,
            },
            checked: {
              type: Boolean,
              default: false,
            },
          },
        ],
      },
    ],
    date: {
      startDate: {
        type: Date,
      },
      endDate: {
        type: Date,
      },
      completed: {
        type: Boolean,
        default: false,
      },
    },
  },
  { timestamps: true },
);

export default mongoose.model('Card', cardModel);
