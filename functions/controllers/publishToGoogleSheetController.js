const functions = require('firebase-functions');
const { GoogleSpreadsheet } = require('google-spreadsheet');
const { generateSheetRecord } = require("../utils/getRecord");

const publishToGoogleSheet = async (params) => {
  try {
    // use service account creds and loads document properties and worksheets.
    const doc = new GoogleSpreadsheet(functions.config().auth.sheetid);
    await doc.useServiceAccountAuth(require('../credentials.json'));
    await doc.loadInfo();

    // generate the content of the record being added.
    const { date, event } = generateSheetRecord(params);

    const { firstName, lastName, userId } = params;

    const addToExistingWorkSheet = async (sheet) => {
      await sheet.addRow({ Date: date, Event: event });
    }

    const createNewWorkSheet = async () => {
      const newSheet = await doc.addSheet({ title: `${firstName}-${lastName}-${userId}`, headerValues: ['Date', 'Event'] });

      // add a row
      await newSheet.addRow({ Date: date, Event: event });
    }

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
      addToExistingWorkSheet(doc.sheetsByIndex[existingSheetId]);
    } else {
      // add a sheet for the user who is not recorded yet in the spreadsheets.
      createNewWorkSheet();
    }
  } catch (error) {
    console.log('error', error);
  }
}

module.exports = {
  publishToGoogleSheet
}