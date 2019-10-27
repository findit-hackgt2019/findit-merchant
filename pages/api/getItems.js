const searchActions = require('../../server/ncrAPI/search');

export default async function getItems(req, res) {
  const clientId = process.env.NCRCLIENTID;
  const clientSecret = process.env.NCRCLIENTSECRET;

  await searchActions.getAllItems(clientId, clientSecret)
      .then((items) => {
        res.json(items);
      })
      .catch(() => {
        res.status(400).json({ status: 'Failed' });
      });
}
