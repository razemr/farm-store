import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineDot,
  TimelineConnector,
  TimelineContent,
} from '@material-ui/lab';
import {
  Typography,
  Paper,
  makeStyles,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';
import {
  MoreHoriz,
  Error,
  CheckCircle,
  RemoveCircle,
} from '@material-ui/icons';
import { MILESTONE_STATUS as STATUS } from '../../utils/constants';
import { ProductCategoryIcon } from '../ProductCategoryIcon';
import { CheckboxControl } from '../FormControls/CheckboxControl';
import { useMilestoneStatus } from '../../hooks';
import { MilestoneTimelineContent } from './MilestoneTimelineContent';

const useStyles = makeStyles({
  missingOppositeContent: {
    "&:before": {
      flex: 0,
      padding: 0
    }
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
  const { milestones, onCheck, nextMilestone, align } = props;
  const statusMilestones = useMilestoneStatus(milestones, nextMilestone);
  const classes = useStyles();

  const handleCheck = (status, id) => {
    onCheck(status, id);
  };

  return (
    <Timeline align={align}>
      {statusMilestones &&
        statusMilestones.map((milestone, index) => (
          <TimelineItem classes={{missingOppositeContent: classes.missingOppositeContent}} key={milestone._id}>
            <TimelineSeparator>
              {milestone.status === STATUS.NOT_DUE ? (
                <TimelineDot>
                  <MoreHoriz />
                </TimelineDot>
              ) : milestone.status === STATUS.OVERDUE ? (
                <TimelineDot classes={{ defaultGrey: classes.overdue }}>
                  <Error />
                </TimelineDot>
              ) : milestone.status === STATUS.COMPLETE ? (
                <TimelineDot classes={{ defaultGrey: classes.complete }}>
                  <CheckCircle />
                </TimelineDot>
              ) : (
                <TimelineDot classes={{ defaultGrey: classes.due }}>
                  <RemoveCircle />
                </TimelineDot>
              )}

              <TimelineConnector />
            </TimelineSeparator>
            <MilestoneTimelineContent milestone={milestone} onChange={(e) => handleCheck(e.target.value, milestone._id)}/>
          </TimelineItem>
        ))}
    </Timeline>
  );
}
