import { makeStyles } from '@material-ui/core';
import { MoreHoriz, PriorityHigh, Check, Remove } from '@material-ui/icons';
import { MILESTONE_STATUS as STATUS } from '../../utils/constants';
import {
  TimelineSeparator,
  TimelineDot,
  TimelineConnector,
} from '@material-ui/lab';

const useStyles = (props) =>
  makeStyles((theme) => ({
    root: {
      backgroundColor: theme.palette[`${props.color}`].main,
    },
  }));

export const MiliestonTimelineSeparator = (props) => {
  const { status } = props;

  let color = 'inactive';
  let icon = <MoreHoriz />;
  
  switch (status) {
    case STATUS.OVERDUE:
      color = 'error';
      icon = <PriorityHigh />;
      break;
    case STATUS.COMPLETE:
      color = 'success';
      icon = <Check />;
      break;
    case STATUS.DUE:
      color = 'warning';
      icon = <Remove />;
      break;
    default: 
        break;
  }

  const classes = useStyles({ color })();

  return (
    <TimelineSeparator>
        <TimelineDot classes={{ root: classes.root }}>
          {icon}
        </TimelineDot>
      <TimelineConnector />
    </TimelineSeparator>
  );
};
