import { useEffect, useState } from 'react';
import { MILESTONE_STATUS as STATUS, WEEK } from '../utils/constants';
import { compareDates } from '../utils/compareDates';

export default function useMilestoneStatus(milestones, nextMilestone) {
  const [statusMilestones, setStatusMilestones] = useState([]);

  useEffect(() => {
    if (!milestones) return;

    let result = milestones
      .map((milestone) => {
        let date = new Date(milestone.date);
        let now = new Date();
        let status = STATUS.NOT_DUE;
        let active = false;

        if (milestone.notifiedFarmer) {
          status = STATUS.COMPLETE;
        } else if (compareDates(date, now, -WEEK) < 0) {
          status = STATUS.OVERDUE;
        } else if (
          compareDates(date, now, -WEEK) >= 0 &&
          compareDates(date, now, WEEK) <= 0
        ) {
          status = STATUS.DUE;
        } else {
          status = STATUS.NOT_DUE;
        }

        //Set current milestone(s) to active
        if (!nextMilestone || milestone.date === nextMilestone) {
          active = true;
        }

        return {
          ...milestone,
          status,
          active,
        };
      })
      .sort((m1, m2) =>
        compareDates(new Date(m1.date), new Date(m2.date)) < 0 ? m1 : m2,
      );

    //Set previous milestone to active
    if (nextMilestone) {
      for (let i = 0; i < result.length; i++) {
        if (
          result[i].active &&
          i > 0 &&
          i <= result.length - 1 &&
          !result[i].notifiedFarmer
        ) {
          result[i - 1].active = true;
        }
      }
    }

    setStatusMilestones(result);
  }, [milestones]);

  return statusMilestones;
}
