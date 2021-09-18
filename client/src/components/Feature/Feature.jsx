import './Feature.css';
import { makeStyles, Paper, Typography } from '@material-ui/core';
import React from 'react';

const useStyles = (props) =>
  makeStyles((theme) => ({
    paperRoot: {
      background: theme.customBackgrounds[`${props.color}`],
      boxShadow: theme.customShadows[`${props.color}`],
    },
  }));

export default function Feature(props) {
  const { color, icon, title, value, footer } = props;
  const classes = useStyles({ color })();
  const formattedIcon = React.isValidElement(icon)
    ? React.cloneElement(icon, {
        fontSize: 'large',
        className: 'feature-icon',
      })
    : '';

  return (
    <Paper className="feature-wrapper">
      <div>
        <Paper
          className="feature-icon-container"
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
      </div>

      <Typography
        align="left"
        variant="caption"
        className="feature-footer"
        component="div"
        color="textSecondary"
      >
        {footer}
      </Typography>
    </Paper>
  );
}
