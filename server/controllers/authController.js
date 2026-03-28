const Users = require('../models/User');
const { generateToken } = require('../helpers/jwt');
const bcrypt = require('bcryptjs');


const registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    // Email koontrolü
    const existingUser = await Users.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        message: 'Email already in use',
      });
    }

    // user oluştur
    const user = await Users.create({
      name,
      email,
      password,
    });

    // Token üret
    const token = generateToken(user._id);

    // Token DB'ye kaydet
    user.token = token;
    await user.save();

    // Response
    res.status(201).json({
  user: {
    name: user.name || name,
    email: user.email || email,
  },
  token,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Server error',
      error: error.message,
    });
  }
};

const loginUser = async (req, res, next) => {
    try {
    const { email, password } = req.body;

    // Kullanıcı kontrolü
    const user = await Users.findOne({ email });
    if (!user) {
      return res.status(401).json({
        message: 'Invalid email or password',
      });
    }

    // Şifre kontrol
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        message: 'Invalid email or password',
      });
    }

    // Token üret
    const token = generateToken(user._id);

    user.token = token;
    await user.save();

    // Response
    res.json({
      user: {
        name: user.name,
        email: user.email,
      },
      token,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Server error',
      error: error.message,
    });
  }
};

const logoutUser = async (req, res, next) => {
  try {
    req.user.token = null;
    await req.user.save();

    res.status(204).send(); // No Content
  } catch (error) {
    res.status(500).json({
      message: 'Server error',
      error: error.message,
    });
  }
};

const getCurrentUser = async (req, res, next) => {
  try {
    // Middleware (authenticate) zaten kullanıcıyı bulup req.user'a ekledi.
    const { name, email, dailyCalories, notRecommendedProducts } = req.user;

    res.status(200).json({
      user: {
        name,
        email,
        dailyCalories,
        notRecommendedProducts,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: 'Server error',
      error: error.message,
    });
  }
};

module.exports = { registerUser, loginUser, logoutUser, getCurrentUser };
