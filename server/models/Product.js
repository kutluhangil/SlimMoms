const { Schema, model } = require('mongoose');

const productSchema = new Schema(
  {
    categories: {
      type: String,
    },
    weight: {
      type: Number,
    },
    title: {
      type: String,
      required: true,
    },
    calories: {
      type: Number,
      required: true,
    },
    groupBloodNotAllowed: {
      type: [Schema.Types.Mixed],
      default: [],
    },
  },
  { versionKey: false }
);

module.exports = model('Product', productSchema);
