import { MILESTONE_STATUS as STATUS, WEEK } from './constants';
import { compareDates } from './compareDates';

export const getMilestoneStatus = (date, notifiedFarmer) => {
  let now = new Date();

  if (notifiedFarmer) {
    return STATUS.COMPLETE;
  } else if (compareDates(date, now, -WEEK) < 0) {
    return STATUS.OVERDUE;
  } else if (
    compareDates(date, now, -WEEK) >= 0 &&
    compareDates(date, now, WEEK) <= 0
  ) {
    return STATUS.DUE;
  } else {
    return STATUS.NOT_DUE;
  }
};
