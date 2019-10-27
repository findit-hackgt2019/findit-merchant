const orderActions = require('../../server/mongodb/actions/orders');

export default async function editOrder(req, res) {
  const { id, order } = req.body;

  await orderActions.editOrder(id, order)
    .then(() => {
      res.status(200).json({ status: 'Success' });
    })
    .catch(() => {
      res.status(400).json({ status: 'Failed' });
    });
}
