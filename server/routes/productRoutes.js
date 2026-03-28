const router = require('express').Router();
const authenticate = require('../middleware/auth');
const {
  searchProducts,
  getPublicCalories,
  getPrivateCalories,
} = require('../controllers/productController');

router.get('/', searchProducts);
router.post('/public', getPublicCalories);
router.post('/private', authenticate, getPrivateCalories);

module.exports = router;
