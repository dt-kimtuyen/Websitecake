const mongoose = require('mongoose');

const WarehouseSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  location: {
    type: String
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Warehouse', WarehouseSchema);
