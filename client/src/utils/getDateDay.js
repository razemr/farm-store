export const getDateDay = (date) => {
  let day = date.getDate().toString();
  if (day.length === 1) {
    day = `0${day}`;
  }

  return day;
};
