const searchActions = require('../../server/actions/search');

export default async function getItems(req, res) {
  const clientId = process.env.NCRCLIENTID;
  const clientSecret = process.env.NCRCLIENTSECRET;

  const items =
    await searchActions.getAllItems(clientId, clientSecret)
      .catch(() => {
        return res.status(400).json({ status: 'Failed' });
      });

  res.json(items);
}
