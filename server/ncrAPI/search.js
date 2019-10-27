const fetch = require('isomorphic-unfetch');
const authActions = require('./oauth');

const itemsUrl = 'https://api-reg-apigee.ncrsilverlab.com/v2/inventory/items?include_deleted=false&include_available_online_only=false&include_price_list_info=false';

async function getAllItems(clientId, clientSecret) {
  const bToken = await authActions.getAuthToken(clientId, clientSecret);

  return fetch(itemsUrl, {
    method: 'get',
    headers: {
      'Authorization': 'Bearer ' + bToken,
      'Content-Type': 'application/x-www-form-urlencoded',
      'Accept': 'application/json'
    }
  })
    .then((res) => res.json())
    .then((data) => data.Result)
    .then((items) => items.map((item) => ({
      name: item.Name,
      description: item.Description,
      category: item.ItemCategoryName,
      quantity: item.PackageQty,
      price: item.RetailPrice,
    })));
}

async function searchItems(clientId, clientSecret, name) {
  const bToken = await authActions.getAuthToken(clientId, clientSecret);

  return fetch(itemsUrl, {
    method: 'get',
    headers: {
      'Authorization': 'Bearer ' + bToken,
      'Content-Type': 'application/x-www-form-urlencoded',
      'Accept': 'application/json'
    }
  })
    .then((res) => res.json())
    .then((data) => data.Result)
    .then((items) => items.reduce((found, item) => {
      if (item.Name.includes(name)) {
        found.push({
          name: item.Name,
          description: item.Description,
          category: item.ItemCategoryName,
          quantity: item.PackageQty,
          price: item.RetailPrice,
        });
      }

      return found;
    }, []));
}

module.exports = {
  getAllItems,
  searchItems
};
