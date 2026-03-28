const { Schema, model } = require('mongoose');

// NOTE (backend-dev-2): Added dailyCalories and notRecommendedProducts fields
// required by POST /api/products/private and GET /api/diary/:date endpoints.
// The rest of the User schema (name, email, password, token, etc.)
// should be filled in by the other backend developer (authController owner).
const userSchema = new Schema(
  {
    // --- Fields to be added by backend-dev-1 (auth owner) ---
    // name: { type: String, required: true },
    // email: { type: String, required: true, unique: true },
    // password: { type: String, required: true },
    // token: { type: String, default: null },

    // --- Fields added by backend-dev-2 for calorie tracking ---
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
