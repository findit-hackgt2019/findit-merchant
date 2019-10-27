const orderActions = require('../../server/mongodb/actions/orders');

export default async function deleteOrder(req, res) {
  const { id } = req.body;

  await orderActions.deleteOrder(id)
    .then(() => {
      res.status(200).json({ status: 'Success' });
    })
    .catch(() => {
      res.status(400).json({ status: 'Failed' });
    });
}
