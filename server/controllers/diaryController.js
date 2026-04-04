const DayInfo = require('../models/DayInfo');
const Product = require('../models/Product');

const addProduct = async (req, res, next) => {
  try {
    const { date, productId, weight } = req.body;

    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      return res
        .status(400)
        .json({ message: 'date YYYY-MM-DD formatında olmalıdır' });
    }

    // Weight için sıfırdan büyük olma kontrolü eklendi
    if (!productId || !weight || weight <= 0) {
      return res
        .status(400)
        .json({
          message:
            'Geçerli bir productId ve 0 dan büyük bir weight gönderilmelidir',
        });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const portionCalories = Math.round((product.calories / 100) * weight);

    const newEntry = {
      productId: product._id,
      title: product.title,
      weight,
      calories: portionCalories,
    };

    // Eşzamanlı isteklerde patlamaması (race condition) için
    // find-then-save yerine findOneAndUpdate kullanıyoruz.
    // rawResult ile ham MongoDB sonucunu alıyoruz ki 201 / 200 ayrımını
    // doğru yapabilelim — lastErrorObject.updatedExisting false ise upsert ile
    // yeni kayıt oluşturulmuş demektir.
    const result = await DayInfo.findOneAndUpdate(
      { date, userId: req.user._id },
      {
        $push: { eatenProducts: newEntry },
        $inc: { 'daySummary.eatenCalories': portionCalories },
        $setOnInsert: { date, userId: req.user._id },
      },
      { new: true, upsert: true, runValidators: true, rawResult: true }
    );

    const isNew = !result.lastErrorObject.updatedExisting;
    return res.status(isNew ? 201 : 200).json(result.value);
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
      return res
        .status(404)
        .json({ message: 'Product entry not found in this day record' });
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

    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      return res
        .status(400)
        .json({ message: 'date YYYY-MM-DD formatında olmalıdır' });
    }

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
