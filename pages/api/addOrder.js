const orderActions = require('../../server/mongodb/actions/orders');

export default async function addOrder(req, res) {
  const { order } = req.body;

  await orderActions.addOrder(order)
    .then((result) => {
      res.status(200).json(result);
    })
    .catch(() => {
      res.status(400).json({ status: 'Failed' });
    });
}
