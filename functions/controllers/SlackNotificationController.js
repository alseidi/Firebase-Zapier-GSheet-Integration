const functions = require('firebase-functions');

const getSlackWebhook = (roles) => {

  /* determine roles here.
  *  Based on the roles, we can determine which channel to publish to.
  *  Just hardcoded a channel for now.
  */
  console.log("Roles For Determining Channels", roles);
  const { IncomingWebhook } = require('@slack/webhook');
  const url = functions.config().slack.url;
  return new IncomingWebhook(url);
}

const sendSlackNotification = async (params) => {
  const { hours, notes, task, firstName, lastName, timerStartedAt, roles } = params;

  const manualTimeEntry = timerStartedAt ? "No" : "Yes";
  const message = `Name: ${firstName} ${lastName}, Hours: ${hours}, Notes: ${notes || "No Comment Submitted"}, Task: ${task}, Manual Time Entry: ${manualTimeEntry}`;

  try {
    getSlackWebhook(roles).send({ text: message });
  } catch (err) {
    console.log(err);
  }
}

const sendWeekDayNotification = async (message, roles = []) => {
  getSlackWebhook(roles).send({ text: message });
}

module.exports = {
  sendSlackNotification,
  sendWeekDayNotification
}