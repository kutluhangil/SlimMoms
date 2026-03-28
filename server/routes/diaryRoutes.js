const router = require('express').Router();
const authenticate = require('../middleware/auth');
const {
  addProduct,
  deleteProduct,
  getDayInfo,
} = require('../controllers/diaryController');

// All diary routes require authentication
// POST /api/diary — add a product to the diary
router.post('/', authenticate, addProduct);

// DELETE /api/diary/:dayInfoId/:productId — remove a product from a day record
router.delete('/:dayInfoId/:productId', authenticate, deleteProduct);

// GET /api/diary/:date — get diary entry for a specific date (format: YYYY-MM-DD)
router.get('/:date', authenticate, getDayInfo);

module.exports = router;
