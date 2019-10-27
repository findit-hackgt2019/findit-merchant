const mongoose = require('mongoose');

const { Schema } = mongoose;

// Create Schema
const OrderSchema = new Schema({
  created: {
    type: Date,
    required: true,
  },
  items: {
    type: Array,
    required: true,
  }
});

let Order;

if (mongoose.models.Order) {
  Order = mongoose.model('Order');
} else {
  Order = mongoose.model('Order', OrderSchema);
}

module.exports = Order;
