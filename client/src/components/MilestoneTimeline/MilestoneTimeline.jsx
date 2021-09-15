import { Timeline, TimelineItem } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core';
import { useMilestoneStatus } from '../../hooks';
import { MilestoneTimelineContent } from './MilestoneTimelineContent';
import { MiliestonTimelineSeparator } from './MiliestonTimelineSeparator';
import { GlobalContext } from '../../context/GlobalState';
import { useContext } from 'react';
import {CheckboxControl} from '../FormControls/CheckboxControl';

const useStyles = makeStyles({
  controlRoot: {
      '& .MuiButtonBase-root': {
        padding: '0 !important'
    }
  },
  missingOppositeContent: {
    '&:before': {
      flex: 0,
      padding: 0,
    },
  },
  due: {
    backgroundColor: 'rgb(235, 241, 254)',
    color: 'rgb(42, 122, 222)',
  },
  overdue: {
    backgroundColor: 'rgb(255, 240, 241)',
    color: 'rgb(217, 80, 135)',
  },
  complete: {
    backgroundColor: 'rgb(229, 250, 242)',
    color: 'rgb(59, 176, 119)',
  },
});

export default function MilestoneTimeline(props) {
  const { program } = useContext(GlobalContext);
  const { onCheck, align } = props;
  const statusMilestones = useMilestoneStatus(
    program.milestones,
    program.nextMilestone,
  );

  const classes = useStyles();

  const handleCheck = (status, id) => {
    onCheck(status, id);
  };

  return (
    <Timeline align={align}>
      {statusMilestones &&
        statusMilestones.map((milestone, index) => (
          <TimelineItem
            // classes={{ missingOppositeContent: classes.missingOppositeContent }}
            key={milestone._id}
          >
            <MiliestonTimelineSeparator status={milestone.status} />
            <MilestoneTimelineContent
              milestone={milestone}
              actions={
                <div>
                  <CheckboxControl classes={{root: classes.controlRoot}}
                    label="Mark as complete"
                    value={milestone.notifiedFarmer}
                    onChange={(e) => handleCheck(e.target.value, milestone._id)}
                    disabled={!milestone.active}
                  />
                </div>
              }
            />
          </TimelineItem>
        ))}
    </Timeline>
  );
}
