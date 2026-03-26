const { Schema, model } = require('mongoose');

const productSchema = new Schema({});

module.exports = model('Product', productSchema);
