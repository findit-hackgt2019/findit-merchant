const fetch = require('isomorphic-unfetch');

const authUrl = 'https://api-reg-apigee.ncrsilverlab.com/v2/oauth2/token';

async function getAuthToken(clientId, clientSecret) {
  return fetch(authUrl, {
    method: 'get',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Accept': 'application/json',
      'client_id': clientId,
      'client_secret': clientSecret
    }
  })
    .then((res) => res.json())
    .then((data) => data.Result.AccessToken);
}

module.exports = {
  getAuthToken
};
