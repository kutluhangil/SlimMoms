const router = require('express').Router();
const authenticate = require('../middleware/auth');

const {
  registerUser,
  loginUser,
  logoutUser,
  getCurrentUser
} = require('../controllers/authController');

// REGISTER
router.post('/register', registerUser);

// LOGIN
router.post('/login', loginUser);

// LOGOUT (protected)
router.post('/logout', authenticate, logoutUser);

// GET /api/auth/current
router.get('/current', authenticate, getCurrentUser);

module.exports = router;
