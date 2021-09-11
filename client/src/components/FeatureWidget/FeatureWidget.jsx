import './FeatureWidget.css';
import { makeStyles, Paper, Typography } from '@material-ui/core';
import { Assignment } from '@material-ui/icons';

const useStyles = makeStyles({
  root: {
    marginTop: '20px !important',
  },
});

export default function FeatureWidget() {
  const classes = useStyles();

  return (
    <Paper className="featured-wrapper" elevation={10}>
      <Paper className="featured-icon-container">
        <Assignment fontSize="large" className="featured-icon" />
      </Paper>
      <Typography align="right" variant="subtitle1" color="textSecondary">
        Programs
      </Typography>
      <Typography align="right" variant="h5">
        13
      </Typography>
      <Typography
        variant="caption"
        className="featured-footer"
        component="div"
        classes={{ root: classes.root }}
        color="textSecondary"
      >
        Last 24 hours
      </Typography>
    </Paper>
  );
}
