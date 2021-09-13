import { Paper, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import './Card.css';

const useStyles = (props) =>
  makeStyles((theme) => ({
    cardRoot: {},
    labelRoot: {
      background: theme.customBackgrounds[`${props.color}`],
      boxShadow: theme.customShadows[`${props.color}`],
    },
  }));

export default function Card(props) {
  const {
    elevation,
    label,
    color,
    header,
    actions,
    subtitle,
    footer,
    children,
    ...other
  } = props;
  const classes = useStyles({ color })();

  return (
    <Paper
      {...other}
      className="card"
      elevation={elevation && 0}
      classes={{ root: classes.cardRoot }}
    >
      <div className="card-header">
        <Paper className="card-label" classes={{ root: classes.labelRoot }}>
          {label}
        </Paper>
        <Typography variant="h2">{header}</Typography>
        <Typography variant="subtitle1">{subtitle}</Typography>
        <div className="card-actions">
          {actions}
        </div>
        <div className="clear"></div>
      </div>
      <div className="card-body">{children}</div>
      {footer && <div className="card-footer">{footer}</div>}
    </Paper>
  );
}
