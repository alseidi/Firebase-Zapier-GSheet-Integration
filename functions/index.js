const functions = require('firebase-functions');

const admin = require('firebase-admin');
admin.initializeApp();
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.newTimeSheet = functions.https.onRequest((request, response) => {
  // console.log('Request data from zapier: ==========', request.body);
  // response.send("Hello from Firebase!");
  // TODO: write req.body into google sheet
  // TODO: send notification to slack channel
});
