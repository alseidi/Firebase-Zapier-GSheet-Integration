const functions = require('firebase-functions');
const admin = require('firebase-admin');
const { http } = require("./utils/http");
const { sendSlackNotification } = require("./controllers/SlackNotificationController");
const { publishToGoogleSheet } = require("./controllers/publishToGoogleSheetController");
const { notifyWeekDayInfo } = require("./controllers/HarvestController");

admin.initializeApp();

exports.monitorHarvest = functions.https.onRequest(async (req, res) => {
  const { hours, notes, task, timerStartedAt, userId, createdAt } = req.body;

  const { data } = await http(`/users/${userId}`, "GET");
  const { first_name: firstName, last_name: lastName, roles } = data;
  const monitorParams = { hours, notes, task, timerStartedAt, firstName, lastName, createdAt };

  // Manual time entry or Time entry with no comments
  if (!timerStartedAt || !notes) {
    sendSlackNotification({ ...monitorParams, roles });
    publishToGoogleSheet({ ...monitorParams, userId });
  }

  res.status(200).send("Monitored time entry successfully!");
});

exports.monitorWeekDaySubmission = functions.pubsub
  .schedule('59 23 * * 1,2,3,4,5')
  .timeZone('America/New_York')
  .onRun(() => {
    notifyWeekDayInfo();
    return null;
  });