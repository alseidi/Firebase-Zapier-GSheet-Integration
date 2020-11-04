const { http } = require("../utils/http");

const getHarvestUser = async (userId) => {
  try {
    const response = await http(`/users/${userId}`, "GET");
    return response.data;
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  getHarvestUser
}