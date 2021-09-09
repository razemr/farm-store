import { useEffect, useState } from 'react';
import { MILESTONE_STATUS as STATUS, WEEK } from '../utils/constants';
import { compareDates } from '../utils/compareDates';

export default function useMilestoneStatus(milestones) {
  const [statusMilestones, setStatusMilestones] = useState([]);

  useEffect(() => {
    if(!milestones) return;

    setStatusMilestones(() => {
      return milestones.map((milestone) => {
        let date = new Date(milestone.date);
        let now = new Date();
        let status = STATUS.NOT_DUE;
        if (milestone.notifiedFarmer) status = STATUS.COMPLETE;
        else if (compareDates(date, now, -WEEK) < 0) status = STATUS.OVERDUE;
        else if (
          compareDates(date, now, -WEEK) >= 0 &&
          compareDates(date, now, WEEK) <= 0
        )
          status = STATUS.DUE;
        else status = STATUS.NOT_DUE;
        return {
          ...milestone,
          status,
        };
      });
    });
  }, [milestones]);

  return [statusMilestones, setStatusMilestones];
}
