const functions = require('firebase-functions');

const admin = require('firebase-admin');
admin.initializeApp();
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.trackSheet = functions.https.onRequest((request, response) => {
  // TODO: Track records to Google sheet
  console.log('=== Sheet data from zapier: ',  request.body);
});

exports.notifySlack = functions.https.onRequest((request, response) => {
  // TODO: send notification to slack channel
  console.log('=== Slack data from zapier: ', request.body);
});
