const { Schema, model } = require('mongoose');

const userSchema = new Schema(
  {
    // auth fields will go here (name, email, password, token etc)

    dailyCalories: {
      type: Number,
      default: 0,
    },
    notRecommendedProducts: {
      type: [String],
      default: [],
    },
  },
  { versionKey: false }
);

module.exports = model('User', userSchema);
