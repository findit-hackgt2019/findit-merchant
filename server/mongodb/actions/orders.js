const mongoose = require('mongoose');
const mongoDB = require('../index');
const Order = require('../models/Order');

async function getAllOrders() {
  await mongoDB();

  let orders = [];

  await Order
    .find()
    .sort({ created: -1 })
    .then((res) => {
      orders = res;
      mongoose.connection.close();
    })
    .catch(() => {
      mongoose.connection.close();
    });

  return orders;
}

async function getOrder(id) {
  await mongoDB();

  let order = {};

  try {
    order = await Order.findById(id);
  } finally {
    mongoose.connection.close();
  }

  return order;
}

async function addOrder(order) {
  await mongoDB();

  try {
    const newOrder = new Order(order);
    await newOrder.save();
  } finally {
    mongoose.connection.close();
  }

  return order;
}

async function editOrder(id, newOrder) {
  await mongoDB();

  try {
    Order.findById(id, (err, doc) => {
      if (!err) {
        Object.keys(newOrder).forEach((key) => {
          doc[key] = newOrder[key];
        });

        doc.save();
      }
    });
  } finally {
    mongoose.connection.close();
  }
}

async function deleteOrder(id) {
  await mongoDB();

  await Order.findById(id)
    .then((order) => order.remove())
    .then(() => {
      mongoose.connection.close();
    })
    .catch(() => {
      mongoose.connection.close();
    });
}

module.exports = {

};
