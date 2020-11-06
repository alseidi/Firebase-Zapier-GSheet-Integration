const functions = require('firebase-functions');
const { GoogleSpreadsheet } = require('google-spreadsheet');
const { generateSheetRecord } = require("../utils/getRecord");

const publishToGoogleSheet = async (params) => {
  const { firstName, lastName, userId } = params;
  // generate the content of the record being added.
  const { date, event } = generateSheetRecord(params);

  try {
    const doc = new GoogleSpreadsheet(functions.config().auth.sheetid);
    // use service account creds and loads document properties and worksheets.
    await doc.useServiceAccountAuth(require('../credentials.json'));
    await doc.loadInfo();

    let isPresent = false;
    let existingSheetId = 0;
    for (let i = 0; i < doc.sheetCount; i++) {
      if (doc.sheetsByIndex[i].title.includes(userId)) {
        isPresent = true;
        existingSheetId = i;
        break;
      }
    }

    if (isPresent) {
      // add a record to the existing worksheet.
      await doc.sheetsByIndex[existingSheetId].addRow({ Date: date, Event: event })
    } else {
      // add a sheet for the user who is not recorded yet in the spreadsheets.
      const newSheet = await doc.addSheet({
        title: `${firstName}-${lastName}-${userId}`,
        headerValues: ['Date', 'Event']
      });
      await newSheet.addRow({ Date: date, Event: event });
    }
  } catch (error) {
    console.log('error', error);
  }
}

module.exports = {
  publishToGoogleSheet
}