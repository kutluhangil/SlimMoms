const router = require('express').Router();
const authenticate = require('../middleware/auth');
const {
  addProduct,
  deleteProduct,
  getDayInfo,
} = require('../controllers/diaryController');

router.post('/', authenticate, addProduct);
router.delete('/:dayInfoId/:productId', authenticate, deleteProduct);
router.get('/:date', authenticate, getDayInfo);

module.exports = router;
