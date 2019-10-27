const orderActions = require('../../server/mongodb/actions/orders');

export default async function getAllOrders(req, res) {
  await orderActions.getAllOrders()
    .then((orders) => {
      res.json(orders);
    })
    .catch(() => {
      res.status(400).json({ status: 'Failed' });
    });
}
