const functions = require('firebase-functions');
const admin = require('firebase-admin');
const { sendSlackNotification } = require("./controllers/SlackNotificationController");

admin.initializeApp();

exports.monitorHarvest = functions.https.onRequest((req, res) => {
  const { notes, timerStartedAt } = req.body;
  if (notes) {
    if (!timerStartedAt) {
      sendSlackNotification(req.body);
    }
  } else {
    sendSlackNotification(req.body);
  }
  res.status(200).send("Monitored time entry successfully!");
});
