const { Schema, model } = require('mongoose');

const dayInfoSchema = new Schema({});

module.exports = model('DayInfo', dayInfoSchema);
