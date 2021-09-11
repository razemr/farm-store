import { Paper, Typography, Grid } from '@material-ui/core';
import './ProgramDetailsWidget.css';

export default function ProgramDetails(props) {
  const { program } = props;
  return (
    <Paper elevation={10} className="details-wrapper">
      <img
        className="details-image"
        src={
          Boolean(program.crop) &&
          `${process.env.PUBLIC_URL}/images/${program.crop.name}.jpg`
        }
        alt=""
      />
      <Typography align="center">
        {Boolean(program.crop) && program.crop.name}
      </Typography>
      <Typography align="center">{Boolean(program) && program.name}</Typography>

      <Grid container>
        <Grid item md={6}>
          <Typography variant="subtitle1" color="textSecondary">TIMELINE</Typography>
            <Grid container>
              <Grid item md={6}>
                <Typography>Start Date:</Typography>
              </Grid>
              <Grid item md={6}>
              <Typography>{program.startDate}</Typography>
              </Grid>
            </Grid>
            <Grid container>
              <Grid item md={6}>
                <Typography>Next Milestone:</Typography>
              </Grid>
              <Grid item md={6}>
              <Typography>{program.nextMilestone}</Typography>
              </Grid>
            </Grid>
        </Grid>
        <Grid item md={6}></Grid>
      </Grid>
    </Paper>
  );
}
