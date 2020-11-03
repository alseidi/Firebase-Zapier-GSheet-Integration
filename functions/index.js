const functions = require('firebase-functions');

const admin = require('firebase-admin');
admin.initializeApp();

const IncomingWebhook = require('@slack/client').IncomingWebhook;
const url = "https://hooks.slack.com/services/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";
const webhook = new IncomingWebhook(url);

function sendMessage(message) {
  webhook.send(message, function (err, header, statusCode, body) {
    if (err) {
      console.log('Error:', err);
    } else {
      console.log('Received', statusCode, 'from Slack');
    }
  });
}

exports.trackSheet = functions.https.onRequest((request, response) => {
  // TODO: Track records to Google sheet
  // console.log('=== Sheet data from zapier: ', request.body);
});

exports.notifySlack = functions.https.onRequest((request, response) => {
  // TODO: send notification to slack channel

  console.log('=== Slack data from zapier: ', request.body);
  const { hours, notes, task, manual, userId } = request.body;

  const message = `${hours} Hours, ${notes} notes, ${task} task:`;
  sendMessage(message);
  return true;
});
