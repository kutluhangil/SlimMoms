const { Schema, model } = require('mongoose');

const productSchema = new Schema(
  {
    categories: {
      type: [String],
      default: [],
    },
    weight: {
      type: Number,
      required: true,
    },
    title: {
      ua: {
        type: String,
        required: true,
      },
      ru: {
        type: String,
        required: true,
      },
    },
    calories: {
      type: Number,
      required: true,
    },
  },
  { versionKey: false }
);

module.exports = model('Product', productSchema);
