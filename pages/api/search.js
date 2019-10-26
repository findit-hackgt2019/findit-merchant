const searchActions = require('../../server/actions/search');

export default async function search(req, res) {
  const clientId = process.env.NCRCLIENTID;
  const clientSecret = process.env.NCRCLIENTSECRET;

  let name = req.method === 'POST' ? req.body.name : req.query.name;

  const items = await searchActions.searchItems(clientId, clientSecret, name)
    .catch(() => {
      return res.status(400).json({ status: 'Failed' });
    });

  res.json(items);
}
