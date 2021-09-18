import { Paper, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import './Container.css';

const useStyles = (props) =>
  makeStyles((theme) => ({
    paperRoot: {
      background: theme.customBackgrounds[`${props.color}`],
      boxShadow: theme.customShadows[`${props.color}`],
      color: 'white !important',
    },
  }));

export default function Container(props) {
  const { title, subtitle, color, children, ...other } = props;
  const classes = useStyles({ color })();
  return (
    <Paper elevation={1} className="container-wrapper" {...other}>
      <Paper classes={{ root: classes.paperRoot }} className="container-header">
        <Typography align="right" variant="h4">
          {title}
        </Typography>
        <Typography align="right" variant="subtitle1">
          {subtitle}
        </Typography>
      </Paper>
      {children}
    </Paper>
  );
}
