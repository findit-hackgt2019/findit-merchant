import exampleData from '../../src/exampleData/search';

export default async function search(req, res) {
  const { name } = req.query;

  const tempData = [...exampleData];

  if (name != null) {
    tempData.push({
      name,
      price: 0.0
    });
  }

  res.json(tempData);
}
