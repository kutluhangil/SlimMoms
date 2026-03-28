const router = require('express').Router();
const authenticate = require('../middleware/auth');
const {
  searchProducts,
  getPublicCalories,
  getPrivateCalories,
} = require('../controllers/productController');

// GET /api/products?q=<query> — no auth
router.get('/', searchProducts);

// POST /api/products/public — no auth
router.post('/public', getPublicCalories);

// POST /api/products/private — auth required
router.post('/private', authenticate, getPrivateCalories);

module.exports = router;
