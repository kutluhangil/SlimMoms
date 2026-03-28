const { Schema, model } = require('mongoose');

const eatenProductSchema = new Schema(
  {
    productId: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    weight: {
      type: Number,
      required: true,
    },
    calories: {
      type: Number,
      required: true,
    },
  },
  { _id: true, versionKey: false }
);

const dayInfoSchema = new Schema(
  {
    date: {
      type: String, // YYYY-MM-DD
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    eatenProducts: {
      type: [eatenProductSchema],
      default: [],
    },
    daySummary: {
      eatenCalories: {
        type: Number,
        default: 0,
      },
    },
  },
  { versionKey: false }
);

// one record per user per day
dayInfoSchema.index({ date: 1, userId: 1 }, { unique: true });

module.exports = model('DayInfo', dayInfoSchema);
