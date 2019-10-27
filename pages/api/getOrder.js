const orderActions = require('../../server/mongodb/actions/orders');

export default async function getOrder(req, res) {
  const id = req.method === 'POST' ? req.body.id : req.query.id;

  await orderActions.getOrder(id)
    .then((order) => {
      res.json(order);
    })
    .catch(() => {
      return res.status(400).json({ status: 'Failed' });
    });
}
