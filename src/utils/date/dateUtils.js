/**
 * The utils to work with date formatting
 */
import moment from "moment-timezone";

const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

function datetimeToString(datetimeString) {
  const timestampFormatted = moment.tz(datetimeString, timezone);
  return timestampFormatted.format("YYYY-MM-DD HH:mm");
}

export { datetimeToString };
