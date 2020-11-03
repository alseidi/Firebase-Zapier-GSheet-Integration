// const axios = require('axios');

const IncomingWebhook = require('@slack/client').IncomingWebhook;
const url = "https://hooks.slack.com/services/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";
const webhook = new IncomingWebhook(url);

const sendSlackNotification = async (params) => {
  let { hours, notes, task, userId, timerStartedAt } = params;
  notes = notes ? notes : "No Comment Submitted";
  const manualTimeEntry = timerStartedAt ? "No" : "Yes";

  const message = `Hours: ${hours}, Notes: ${notes}, Task: ${task}, User Id: ${userId}, Manual Time Entry: ${manualTimeEntry}`;

  try {
    webhook.send(message, function (err, header, statusCode, body) {
      if (err) {
        console.log('Error:', err);
      } else {
        console.log('Received', statusCode, 'from Slack');
      }
    });
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  sendSlackNotification
}