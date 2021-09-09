import {
  Timeline,
  TimelineItem,
  TimelineOppositeContent,
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
import { useState, useEffect } from 'react';
import { ProductCategoryIcon } from '../ProductCategoryIcon';
import { CheckboxControl } from '../FormControls/CheckboxControl';
import { useMilestoneStatus } from '../../hooks';

const useStyles = makeStyles({
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
  const { milestones } = props;
  const [statusMilestones, setStatusMilestones] =
    useMilestoneStatus(milestones);
  const classes = useStyles();

  const handleCheck = (e, index) => {
    setStatusMilestones(
      statusMilestones.map((s, i) => {
        if (i === index) {
          return { ...s, notifiedFarmer: e.target.value };
        } else {
          return s;
        }
      }),
    );
  };

  return (
    <Timeline align="alternate">
      {statusMilestones &&
        statusMilestones.map((milestone, index) => (
          <TimelineItem key={milestone._id}>
            <TimelineOppositeContent>
              <Typography variant="body2" color="textSecondary">
                {new Date(milestone.date).toLocaleDateString()}
              </Typography>
            </TimelineOppositeContent>
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
            <TimelineContent>
              <Paper elevation={3} style={{ padding: '10px 20px' }}>
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <CheckboxControl
                    label="Complete"
                    value={milestone.notifiedFarmer}
                    onChange={(e) => handleCheck(e, index)}
                  />
                </div>
                <List>
                  {milestone.productApplications.map((application) => (
                    <ListItem key={application._id}>
                      <ListItemIcon>
                        <ProductCategoryIcon
                          category={application.product.category.name}
                        />
                      </ListItemIcon>
                      <ListItemText
                        primary={`${application.product.name}`}
                        secondary={`${application.quantity} ${application.unit.name}`}
                      />
                    </ListItem>
                  ))}
                </List>
              </Paper>
            </TimelineContent>
          </TimelineItem>
        ))}
    </Timeline>
  );
}
