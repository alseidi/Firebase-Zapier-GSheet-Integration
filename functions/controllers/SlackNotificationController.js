const getSlackWebhook = (roles) => {

  /* determine roles here.
  *  Based on the roles, we can determine which channel to publish to.
  *  Just hardcoded a channel for now.
  */
  console.log("Roles For Determining Channels", roles);
  const IncomingWebhook = require('@slack/client').IncomingWebhook;
  const url = "https://hooks.slack.com/services/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";
  return new IncomingWebhook(url);
}

const sendSlackNotification = async (params) => {
  let { hours, notes, task, firstName, lastName, timerStartedAt, roles } = params;

  notes = notes ? notes : "No Comment Submitted";
  const manualTimeEntry = timerStartedAt ? "No" : "Yes";
  const message = `Name: ${firstName} ${lastName}, Hours: ${hours}, Notes: ${notes}, Task: ${task}, Manual Time Entry: ${manualTimeEntry}`;

  try {
    getSlackWebhook(roles).send(message, function (err, header, statusCode, body) {
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