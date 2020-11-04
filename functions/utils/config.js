const getEnv = () => {
  const BASE_URL = "https://api.harvestapp.com/v2";
  const ACCESS_TOKEN = "2466899.pt.5DkFXmUsSntqYnpXbyF7VAUxGqIh6YGPA666eR-oBg_to79W_T9c1EaKc3nMCa37QVK0pI_3phWkYXMDcMFH2A";
  const HARVEST_ACCOUNT_ID = "476680";
  return { BASE_URL, ACCESS_TOKEN, HARVEST_ACCOUNT_ID };
}

module.exports = {
  getEnv
}
