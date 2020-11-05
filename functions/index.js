const functions = require('firebase-functions');
const admin = require('firebase-admin');
const { sendSlackNotification } = require("./controllers/SlackNotificationController");
const { publishToGoogleSheet } = require("./controllers/publishToGoogleSheetController");
const { getHarvestUser } = require("./controllers/GetHarvestUserController");

admin.initializeApp();

exports.monitorHarvest = functions.https.onRequest(async (req, res) => {
  const { hours, notes, task, timerStartedAt, userId, createdAt } = req.body;

  const user = await getHarvestUser(userId);
  const { first_name: firstName, last_name: lastName, roles } = user;

  const monitorSlackParams = { hours, notes, task, timerStartedAt, firstName, lastName, roles, createdAt };
  const monitorSheetParams = { hours, notes, task, timerStartedAt, firstName, lastName, userId, createdAt };
  if (notes) {
    if (!timerStartedAt) {
      // Manual time entry
      sendSlackNotification(monitorSlackParams);
      publishToGoogleSheet(monitorSheetParams);
    }
  } else {
    // Time entry with no comments
    sendSlackNotification(monitorSlackParams);
    publishToGoogleSheet(monitorSheetParams);
  }
  res.status(200).send("Monitored time entry successfully!");
});
