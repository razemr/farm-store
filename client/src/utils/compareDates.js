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