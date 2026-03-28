const DayInfo = require('../models/DayInfo');
const Product = require('../models/Product');

const addProduct = async (req, res, next) => {
  try {
    const { date, productId, weight } = req.body;

    if (!date || !productId || weight === undefined) {
      return res.status(400).json({ message: 'Missing required fields: date, productId, weight' });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const portionCalories = Math.round((product.calories / 100) * weight);

    let dayInfo = await DayInfo.findOne({ date, userId: req.user._id });

    if (!dayInfo) {
      dayInfo = new DayInfo({
        date,
        userId: req.user._id,
        eatenProducts: [],
        daySummary: { eatenCalories: 0 },
      });
    }

    dayInfo.eatenProducts.push({
      productId: product._id,
      title: product.title,
      weight,
      calories: portionCalories,
    });

    dayInfo.daySummary.eatenCalories =
      (dayInfo.daySummary.eatenCalories || 0) + portionCalories;

    await dayInfo.save();

    return res.status(200).json(dayInfo);
  } catch (err) {
    next(err);
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    const { dayInfoId, productId } = req.params;

    const dayInfo = await DayInfo.findById(dayInfoId);
    if (!dayInfo) {
      return res.status(404).json({ message: 'Day info not found' });
    }

    if (String(dayInfo.userId) !== String(req.user._id)) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    const productEntry = dayInfo.eatenProducts.id(productId);
    if (!productEntry) {
      return res.status(404).json({ message: 'Product entry not found in this day record' });
    }

    dayInfo.daySummary.eatenCalories = Math.max(
      0,
      (dayInfo.daySummary.eatenCalories || 0) - productEntry.calories
    );

    productEntry.deleteOne();
    await dayInfo.save();

    return res.status(200).json(dayInfo);
  } catch (err) {
    next(err);
  }
};

const getDayInfo = async (req, res, next) => {
  try {
    const { date } = req.params;

    const dayInfo = await DayInfo.findOne({ date, userId: req.user._id });

    const dailyCalories = req.user.dailyCalories || 0;
    const notRecommendedProducts = req.user.notRecommendedProducts || [];

    if (!dayInfo) {
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
      dailyCalories > 0 ? Math.round((eatenCalories / dailyCalories) * 100) : 0;

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
