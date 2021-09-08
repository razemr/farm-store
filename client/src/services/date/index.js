export const SECOND = 1000;
export const MINUTE = 1000 * 60;
export const HOUR = 1000 * 60 * 60;
export const DAY = 1000 * 60 * 60 *24;
export const WEEK = 1000 * 60 * 60 * 24 * 7;

export const compareDates = (date1, date2, offset) => {
    date1 = date1.getTime();
    date2 = date2.getTime() + (offset || 0);

    if (date1 > date2) {
        return 1;
      } else if (date1 < date2) {
        return -1;
      } else {
        return 0;
      }
}