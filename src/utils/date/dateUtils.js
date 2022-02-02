/**
 * The utils to work with date formatting
 */

function datetimeToString(datetime) {
    const reg = /^(?<date>\d{4}-\d{2}-\d{2})T(?<hour>\d{2}):(?<minute>\d{2}).*$/gm ;
    const matches = datetime.toISOString().matchAll(reg).next().value.groups;
    return `${matches["date"]} ${matches["hour"]}:${matches["minute"]}`;
}

export {datetimeToString};