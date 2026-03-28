const Product = require('../models/Product');

const searchProducts = async (req, res, next) => {
  try {
    const { q } = req.query;

    if (!q || q.trim() === '') {
      return res.status(400).json({ message: 'Query parameter "q" is required' });
    }

    const searchRegex = new RegExp(q.trim(), 'i');

    const products = await Product.find({
      $or: [{ 'title.ua': searchRegex }, { 'title.ru': searchRegex }],
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

    const notRecommendedProducts = await Product.find({ categories: bloodType });

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

    const notRecommendedProducts = await Product.find({ categories: bloodType });

    req.user.dailyCalories = dailyCalories;
    req.user.notRecommendedProducts = notRecommendedProducts.map(
      (p) => p.title.ua || p.title.ru || String(p._id)
    );
    await req.user.save();

    return res.status(200).json({ dailyCalories, notRecommendedProducts });
  } catch (err) {
    next(err);
  }
};

module.exports = { searchProducts, getPublicCalories, getPrivateCalories };
