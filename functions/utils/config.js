const functions = require('firebase-functions');

const getEnv = () => {
  const BASE_URL = functions.config().auth.baseurl;
  const ACCESS_TOKEN = functions.config().auth.accesstoken;
  const HARVEST_ACCOUNT_ID = functions.config().auth.harvestaccountid;
  return { BASE_URL, ACCESS_TOKEN, HARVEST_ACCOUNT_ID };
}

module.exports = {
  getEnv
}
