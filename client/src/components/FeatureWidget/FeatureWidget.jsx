import './FeatureWidget.css';
import { makeStyles, Paper, Typography } from '@material-ui/core';
import React from 'react';

const useStyles = props => makeStyles( theme => ({
  paperRoot: {
    background: theme.customBackgrounds[`${props.color}`],
    boxShadow: theme.customShadows[`${props.color}`]
  }
}));

export default function FeatureWidget(props) {
  const { color, icon, title, value, footer } = props;
  const classes = useStyles({color})();
  const formattedIcon = React.isValidElement(icon)
    ? React.cloneElement(icon, {
        fontSize: 'large',
        className: 'featured-icon',
      })
    : '';

  return (
    <Paper className="featured-widget">
      <Paper
        className="featured-widget-icon"
        classes={{ root: classes.paperRoot }}
      >
        {formattedIcon}
      </Paper>
      <Typography align="right" variant="subtitle1" color="textSecondary">
        {title}
      </Typography>
      <Typography align="right" variant="h4">
        {value}
      </Typography>
      <Typography
        variant="caption"
        className="featured-footer"
        component="div"
        color="textSecondary"
      >
        {footer}
      </Typography>
    </Paper>
  );
}
