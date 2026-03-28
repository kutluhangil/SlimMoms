const Product = require('../models/Product');

const searchProducts = async (req, res, next) => {
  try {
    const { q } = req.query;

    if (!q || q.trim() === '') {
      return res.status(400).json({ message: 'Query parameter "q" is required' });
    }

    const products = await Product.find({
      title: { $regex: q.trim(), $options: 'i' },
    }).limit(10);

    return res.status(200).json(products);
  } catch (err) {
    next(err);
  }
};

const getPublicCalories = async (req, res, next) => {
  try {
    const { height, currentWeight, desiredWeight, age, bloodType } = req.body;

    if (
      height === undefined ||
      currentWeight === undefined ||
      desiredWeight === undefined ||
      age === undefined ||
      bloodType === undefined
    ) {
      return res.status(400).json({
        message: 'Missing required fields: height, currentWeight, desiredWeight, age, bloodType',
      });
    }

    const dailyCalories = Math.round(
      10 * currentWeight +
        6.25 * height -
        5 * age -
        161 -
        10 * (currentWeight - desiredWeight)
    );

    // groupBloodNotAllowed[bloodType] === true means not allowed for that blood type
    const notRecommendedProducts = await Product.find({
      [`groupBloodNotAllowed.${bloodType}`]: true,
    });

    return res.status(200).json({ dailyCalories, notRecommendedProducts });
  } catch (err) {
    next(err);
  }
};

const getPrivateCalories = async (req, res, next) => {
  try {
    const { height, currentWeight, desiredWeight, age, bloodType } = req.body;

    if (
      height === undefined ||
      currentWeight === undefined ||
      desiredWeight === undefined ||
      age === undefined ||
      bloodType === undefined
    ) {
      return res.status(400).json({
        message: 'Missing required fields: height, currentWeight, desiredWeight, age, bloodType',
      });
    }

    const dailyCalories = Math.round(
      10 * currentWeight +
        6.25 * height -
        5 * age -
        161 -
        10 * (currentWeight - desiredWeight)
    );

    const notRecommendedProducts = await Product.find({
      [`groupBloodNotAllowed.${bloodType}`]: true,
    });

    req.user.dailyCalories = dailyCalories;
    req.user.notRecommendedProducts = notRecommendedProducts.map((p) => p.title);
    await req.user.save();

    return res.status(200).json({ dailyCalories, notRecommendedProducts });
  } catch (err) {
    next(err);
  }
};

module.exports = { searchProducts, getPublicCalories, getPrivateCalories };
