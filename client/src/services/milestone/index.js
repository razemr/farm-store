import { compareDates, WEEK } from "../date";
export const [OVERDUE, DUE, NOT_DUE, COMPLETE] = [
  "Overdue",
  "Due",
  "Not Due",
  "Complete",
];

export const addStatus = (milestones) => {
  if (milestones) {
    return [...milestones].map((milestone) => {
      let date = new Date(milestone.date);
      let now = new Date();
      let status = NOT_DUE;

      if (milestone.notifiedFarmer) status = COMPLETE;
      else if (compareDates(date, now, -WEEK) < 0) status = OVERDUE;
      else if (
        compareDates(date, now, -WEEK) >= 0 &&
        compareDates(date, now, WEEK) <= 0
      )
        status = DUE;
      else status = NOT_DUE;

      return {
        ...milestone,
        status,
      };
    });
  }
};
