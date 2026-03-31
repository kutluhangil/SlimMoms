const Users = require('../models/User');
const { generateToken } = require('../helpers/jwt');
const bcrypt = require('bcryptjs');

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: 'name, email, password zorunludur',
      });
    }

    // Email kontrolü
    const existingUser = await Users.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        message: 'Email already in use',
      });
    }

    // User oluştur
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
    return res.status(201).json({
      user: {
        name: user.name,
        email: user.email,
      },
      token,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: 'Server error',
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: 'email ve password zorunludur',
      });
    }

    // Kullanıcı kontrolü
    const user = await Users.findOne({ email });
    if (!user) {
      return res.status(401).json({
        message: 'Invalid email or password',
      });
    }

    // Şifre kontrolü
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        message: 'Invalid email or password',
      });
    }

    // Token üret
    const token = generateToken(user._id);

    // Token kaydet
    user.token = token;
    await user.save();

    // Response
    return res.json({
      user: {
        name: user.name,
        email: user.email,
      },
      token,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: 'Server error',
    });
  }
};


const logoutUser = async (req, res) => {
  try {
    req.user.token = null;
    await req.user.save();

    res.status(204).send(); // No Content
  } catch (error) {
console.error(error); // sunucu loglarına yaz
res.status(500).json({ message: 'Server error' });
}
};


const getCurrentUser = async (req, res) => {
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
console.error(error); // sunucu loglarına yaz
res.status(500).json({ message: 'Server error' });
}
};

module.exports = { registerUser, loginUser, logoutUser, getCurrentUser };
