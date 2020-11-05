const functions = require('firebase-functions');
const { GoogleSpreadsheet } = require('google-spreadsheet');
const { generateSheetRecord } = require("../utils/getRecord");

const doc = new GoogleSpreadsheet(functions.config().auth.sheetid);

const publishToGoogleSheet = async (params) => {
  const { date, event } = generateSheetRecord(params);
  await doc.useServiceAccountAuth(require('../credentials.json'));
  await doc.loadInfo();

  // add sheet at the first time
  const newSheet = await doc.addSheet({ title: 'Harvest Time Track', headerValues: ['date', 'event'] });

  // add Header at the first time
  const rows = await newSheet.getRows();
  rows[0].date = "Date";
  rows[0].event = "Event";
  await rows[0].save();

  // add a row to the existing sheet
  await newSheet.addRow({ date, event });

  try {

  } catch (err) {

  }
}

module.exports = {
  publishToGoogleSheet
}