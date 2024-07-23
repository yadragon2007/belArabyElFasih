import moment from "moment-timezone";

const getCurrentDateInTimeZone = (timeZone) => {
  return moment.tz(timeZone).format("YYYY-MM-DD");
};
const getCurrentTimeInTimeZone = (timeZone) => {
  return moment.tz(timeZone).format("hh:mm:ss A");
};

export default {
  getCurrentDateInTimeZone,
  getCurrentTimeInTimeZone,
};
