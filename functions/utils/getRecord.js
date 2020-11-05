const dayjs = require("dayjs");

const generateSheetRecord = (params) => {
  let { hours, notes, task, firstName, lastName, timerStartedAt, createdAt } = params;
  notes = notes ? notes : "No Comment Submitted";
  const manualTimeEntry = timerStartedAt ? "No" : "Yes";
  const event = `Name: ${firstName} ${lastName}, Hours: ${hours}, Notes: ${notes}, Task: ${task}, Manual Time Entry: ${manualTimeEntry}`;

  // format date created
  const formatDay = dayjs(createdAt);
  const date = formatDay.format("dddd, MMMM D YYYY HH:mm");

  return {
    date,
    event
  }
}

module.exports = {
  generateSheetRecord
}