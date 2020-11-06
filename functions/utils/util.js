const dayjs = require("dayjs");

const convertTimeZone = () => {
  // get the previous day as UTC +0.
  const timeZoneConverted = dayjs(dayjs().add(-1, 'day'));
  return timeZoneConverted;
}

module.exports = {
  convertTimeZone
}