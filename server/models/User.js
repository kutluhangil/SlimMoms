const bcrypt = require('bcryptjs');
const { Schema, model } = require('mongoose');

const usersSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Invalid email format'],
    },

    password: {
      type: String,
      required: true
    },

    token: {
      type: String,
      default: null,
    },

    dailyCalories: {
      type: Number,
      default: 0,
      min: 0,
    },

    notRecommendedProducts: {
      type: [String], // ürün isimleri ya da ID ler
      default: [],
    },
  },
  {
    timestamps: true, // createdAt updatedAt
  }
);

//Password Hashleme
usersSchema.pre('save', async function () {
  if (!this.isModified('password')) return;

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  catch (error) {
    throw error; // Hatayı Mongoose yakalar
  }
});

module.exports = model('User', usersSchema);
