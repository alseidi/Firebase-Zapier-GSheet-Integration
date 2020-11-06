const dayjs = require("dayjs");
const { http } = require("../utils/http");
const { convertTimeZone } = require("../utils/util");
const { sendWeekDayNotification } = require("./SlackNotificationController");

const notifyWeekDayInfo = async () => {
  try {
    // get harvest users: We should get all users but I can't for now as I'm not an admin.
    // const response = await http(`/users`, "GET");
    // const { users } = response.data;
    // let totalIdList = users.map(user => user.id);

    // use my harvest user id for development
    const myInfoResponse = await http(`/users/me`, "GET");
    const { id: userId, first_name: firstName, last_name: lastName, roles } = myInfoResponse.data;

    // mock idList
    let totalUsersList = [{ userId, name: `${firstName} ${lastName}`, roles }];

    // get time entries for today
    const timeNowFormatted = convertTimeZone();
    const entryResponse = await http(`/time_entries?from=${timeNowFormatted.format("YYYY-MM-DD")}`, "GET");
    const { time_entries: timeEntries } = entryResponse.data;
    if (timeEntries.length === 0) {
      // send slack notification saying no time entry for all users
      const message = "No time entry today for all harvest users!";
      sendWeekDayNotification(message);
    } else {
      // generate an array of time Entries with user's info and the total hours for each user.
      let entriesForToday = [];
      let usersIdListForToday = [];
      timeEntries.forEach(entry => {
        if (entriesForToday[entry.user.id]) {
          let currentEntry = entriesForToday[entry.user.id];
          currentEntry.hours += entry.hours;
        } else {
          entriesForToday[entry.user.id] = { user: entry.user, hours: entry.hours };
          usersIdListForToday.push(entry.user.id);
        }
      });

      totalUsersList.forEach(user => {
        if (usersIdListForToday.includes(user.userId)) {
          if (entriesForToday[user.userId].hours < 5) {
            // send slack notification saying less than 5 hours tracked
            const entryInfo = entriesForToday[user.userId];
            const message = `Less than 5 hours: ${user.name} tracked ${entryInfo.hours} hours today.`;
            sendWeekDayNotification(message, user.roles);
          }
        } else {
          // send slack notification saying no time entry for this user
          const message = `${user.name} tracked no time today.`;
          sendWeekDayNotification(message, user.roles);
        }
      })
    }
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  notifyWeekDayInfo
}