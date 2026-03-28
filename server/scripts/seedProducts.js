const path = require('path');
const fs = require('fs');
const mongoose = require('mongoose');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const connectDB = require('../db/connect');
const Product = require('../models/Product');

const seed = async () => {
  await connectDB();

  const dataPath = path.resolve(__dirname, '../data/products.json');

  if (!fs.existsSync(dataPath)) {
    console.error('products.json not found at server/data/products.json');
    process.exit(1);
  }

  const raw = fs.readFileSync(dataPath, 'utf-8');
  const products = JSON.parse(raw);

  await Product.deleteMany({});

  const inserted = await Product.insertMany(products);
  console.log(`seeded ${inserted.length} products`);

  await mongoose.disconnect();
  process.exit(0);
};

seed().catch((err) => {
  console.error('seed failed:', err);
  process.exit(1);
});
