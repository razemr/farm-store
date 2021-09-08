import {
  Timeline,
  TimelineItem,
  TimelineOppositeContent,
  TimelineSeparator,
  TimelineDot,
  TimelineConnector,
  TimelineContent,
} from "@material-ui/lab";
import { Typography, Paper, makeStyles } from "@material-ui/core";
import {
  MoreHoriz,
  Error,
  CheckCircle,
  RemoveCircle,
} from "@material-ui/icons";
import {
  addStatus,
  OVERDUE,
  NOT_DUE,
  COMPLETE,
} from "../../services/milestone";
import { useState, useEffect } from "react";

const useStyles = makeStyles({
  due: {
    backgroundColor: "rgb(235, 241, 254)",
    color: "rgb(42, 122, 222)"
  },
  overdue: {
    backgroundColor: "rgb(255, 240, 241)",
    color: "rgb(217, 80, 135)"
  },
  complete :{
    backgroundColor: "rgb(229, 250, 242)",
    color: "rgb(59, 176, 119)"
  }

});

export default function MilestoneTimeline(props) {
  const { milestones } = props;
  const [statusMilestones, setStatusMilestones] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    setStatusMilestones(addStatus(milestones));
  }, [milestones]);

  return (
    <Timeline align="alternate">
      {statusMilestones &&
        statusMilestones.map((milestone) => (
          <TimelineItem key={milestone._id}>
            <TimelineOppositeContent>
              <Typography variant="body2" color="textSecondary">
                {new Date(milestone.date).toLocaleDateString()}
              </Typography>
            </TimelineOppositeContent>
            <TimelineSeparator>
              {milestone.status === NOT_DUE ? (
                <TimelineDot>
                  <MoreHoriz />
                </TimelineDot>
              ) : milestone.status === OVERDUE ? (
                <TimelineDot classes={{defaultGrey: classes.overdue}}>
                  <Error />
                </TimelineDot>
              ) : milestone.status === COMPLETE ? (
                <TimelineDot classes={{defaultGrey: classes.complete}}>
                  <CheckCircle />
                </TimelineDot>
              ) : (
                <TimelineDot classes={{defaultGrey: classes.due}}>
                  <RemoveCircle />
                </TimelineDot>
              )}

              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              <Paper elevation={3}>
                <Typography variant="h6" component="h1">
                  Eat
                </Typography>
                <Typography>Because you need strength</Typography>
              </Paper>
            </TimelineContent>
          </TimelineItem>
        ))}
    </Timeline>
  );
}
