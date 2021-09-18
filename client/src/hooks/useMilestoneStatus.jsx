import { useEffect, useState } from 'react';
import { getMilestoneStatus } from '../utils/getMilestoneStatus';
import { compareDates } from '../utils/compareDates';

export default function useMilestoneStatus(milestones, nextMilestone) {
  const [statusMilestones, setStatusMilestones] = useState([]);

  useEffect(() => {
    if (!milestones) return;

    milestones.sort(function (a, b) {
      return compareDates(new Date(a.date), new Date(b.date));
    });

    let result = milestones
      .map((milestone) => {
        let status = getMilestoneStatus(new Date(milestone.date), milestone.notifiedFarmer);
        let active = false;

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
