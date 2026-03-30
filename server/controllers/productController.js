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

// DRY prensibi: Her iki kalori endpointi için hesaplama mantığı ortak kılındı
const buildCalorieResult = async (params) => {
  const { height, age, desiredWeight, bloodType } = params;

  // Kalori hesabı hedef ağırlığa göre güncellendi
  const dailyCalories = Math.round(
    10 * desiredWeight + 6.25 * height - 5 * age - 161
  );

  const notRecommendedProducts = await Product.find({
    [`groupBloodNotAllowed.${bloodType}`]: true,
  });

  return { dailyCalories, notRecommendedProducts };
};

// Girdi doğrulama için yardımcı fonksiyon
const validateInput = (body) => {
  const { height, currentWeight, desiredWeight, age, bloodType } = body;

  // Sayısal girdiler doğrulanıyor
  if (
    [height, currentWeight, desiredWeight, age].some(
      (v) => typeof v !== 'number' || v <= 0
    )
  ) {
    return 'height, currentWeight, desiredWeight ve age pozitif sayı olmalıdır';
  }

  // bloodType doğrulanıyor
  if (![1, 2, 3, 4].includes(Number(bloodType))) {
    return 'bloodType 1, 2, 3 veya 4 olmalıdır';
  }

  return null;
};

const getPublicCalories = async (req, res, next) => {
  try {
    const errorMsg = validateInput(req.body);
    if (errorMsg) {
      return res.status(400).json({ message: errorMsg });
    }

    const result = await buildCalorieResult(req.body);
    return res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

const getPrivateCalories = async (req, res, next) => {
  try {
    const errorMsg = validateInput(req.body);
    if (errorMsg) {
      return res.status(400).json({ message: errorMsg });
    }

    const { dailyCalories, notRecommendedProducts } = await buildCalorieResult(req.body);

    req.user.dailyCalories = dailyCalories;
    req.user.notRecommendedProducts = notRecommendedProducts.map((p) => p.title);
    await req.user.save();

    return res.status(200).json({ dailyCalories, notRecommendedProducts });
  } catch (err) {
    next(err);
  }
};

module.exports = { searchProducts, getPublicCalories, getPrivateCalories };
