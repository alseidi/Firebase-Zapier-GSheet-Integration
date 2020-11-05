const axios = require("axios");
const { getEnv } = require("./config");

const { BASE_URL, ACCESS_TOKEN, HARVEST_ACCOUNT_ID } = getEnv();

const http = (
  url,
  method = "GET",
  body = null,
  params
) => {
  const headers = {
    "Authorization": `Bearer ${ACCESS_TOKEN}`,
    "Harvest-Account-ID": `${HARVEST_ACCOUNT_ID}`
  };
  axios.defaults.baseURL = BASE_URL;
  return axios.request({
    headers,
    url,
    method,
    data: body,
    params,
  });
};

module.exports = {
  http
};