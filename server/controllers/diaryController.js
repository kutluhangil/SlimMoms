const DayInfo = require('../models/DayInfo');
const Product = require('../models/Product');

// POST /api/diary
// Auth required
// Body: { date, productId, weight }
const addProduct = async (req, res, next) => {
  try {
    const { date, productId, weight } = req.body;

    if (!date || !productId || weight === undefined) {
      return res
        .status(400)
        .json({ message: 'Missing required fields: date, productId, weight' });
    }

    // Find the product
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Calculate calories for this portion
    const portionCalories = Math.round((product.calories / 100) * weight);

    // Title for display — prefer Ukrainian, fall back to Russian
    const productTitle = product.title.ua || product.title.ru;

    // Find existing day record or create a new one
    let dayInfo = await DayInfo.findOne({ date, userId: req.user._id });

    if (!dayInfo) {
      dayInfo = new DayInfo({
        date,
        userId: req.user._id,
        eatenProducts: [],
        daySummary: { eatenCalories: 0 },
      });
    }

    // Add the product entry
    dayInfo.eatenProducts.push({
      productId: product._id,
      title: productTitle,
      weight,
      calories: portionCalories,
    });

    // Update total eaten calories
    dayInfo.daySummary.eatenCalories =
      (dayInfo.daySummary.eatenCalories || 0) + portionCalories;

    await dayInfo.save();

    return res.status(200).json(dayInfo);
  } catch (err) {
    next(err);
  }
};

// DELETE /api/diary/:dayInfoId/:productId
// Auth required
const deleteProduct = async (req, res, next) => {
  try {
    const { dayInfoId, productId } = req.params;

    // Find the day record
    const dayInfo = await DayInfo.findById(dayInfoId);
    if (!dayInfo) {
      return res.status(404).json({ message: 'Day info not found' });
    }

    // Ownership check
    if (String(dayInfo.userId) !== String(req.user._id)) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    // Find the product entry inside eatenProducts
    const productEntry = dayInfo.eatenProducts.id(productId);
    if (!productEntry) {
      return res
        .status(404)
        .json({ message: 'Product entry not found in this day record' });
    }

    // Subtract its calories from the daily total
    dayInfo.daySummary.eatenCalories = Math.max(
      0,
      (dayInfo.daySummary.eatenCalories || 0) - productEntry.calories
    );

    // Remove the subdocument
    productEntry.deleteOne();

    await dayInfo.save();

    return res.status(200).json(dayInfo);
  } catch (err) {
    next(err);
  }
};

// GET /api/diary/:date
// Auth required
// NOTE: depends on req.user.dailyCalories and req.user.notRecommendedProducts
// being populated — these come from the User model (set by POST /api/products/private)
const getDayInfo = async (req, res, next) => {
  try {
    const { date } = req.params;

    const dayInfo = await DayInfo.findOne({ date, userId: req.user._id });

    const dailyCalories = req.user.dailyCalories || 0;
    const notRecommendedProducts = req.user.notRecommendedProducts || [];

    if (!dayInfo) {
      // No record for this date — return empty structure
      return res.status(200).json({
        dayInfo: {
          eatenProducts: [],
          daySummary: { eatenCalories: 0 },
        },
        dailyCalories,
        left: dailyCalories,
        percentOfNormal: 0,
        notRecommendedProducts,
      });
    }

    const eatenCalories = dayInfo.daySummary.eatenCalories || 0;
    const left = Math.max(0, dailyCalories - eatenCalories);
    const percentOfNormal =
      dailyCalories > 0
        ? Math.round((eatenCalories / dailyCalories) * 100)
        : 0;

    return res.status(200).json({
      dayInfo,
      dailyCalories,
      left,
      percentOfNormal,
      notRecommendedProducts,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { addProduct, deleteProduct, getDayInfo };
