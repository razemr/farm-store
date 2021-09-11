import { Paper, Typography, Grid, ListItem } from '@material-ui/core';
import {
  AspectRatio,
  CheckCircle,
  Email,
  LocationOn,
  Person,
  Phone,
  Today,
} from '@material-ui/icons';
import './ProgramDetailsWidget.css';

export default function ProgramDetails(props) {
  const { program } = props;

  return (
    Object.keys(program).length > 0 && (
      <Paper elevation={10} className="details-wrapper">
        <img
          className="details-image"
          src={
            Boolean(program.crop) &&
            `${process.env.PUBLIC_URL}/images/${program.crop.name}.jpg`
          }
          alt=""
        />
        <Typography align="center" variant="h5" color="textSecondary" className="crop-name">
          {program.crop.name} - Dasheen PNMS
        </Typography>
        <Typography align="center" variant="h2">
          {program.name}
        </Typography>

        
        <Typography align="center" variant="body1" paragraph className="program-description">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </Typography>

        <Grid container spacing={3} className="property-grid">
          <Grid item md={6}>
            <PropertyItem
              title="Acres"
              value={program.acres}
              icon={<AspectRatio color="disabled" />}
            />
            <PropertyItem
              title="Start Date"
              value={new Date(program.startDate).toLocaleDateString()}
              icon={<Today color="disabled" />}
            />
            <PropertyItem
              title="Next Milestone"
              value={new Date(program.nextMilestone).toLocaleDateString()}
              icon={<Today color="disabled" />}
            />
            <PropertyItem
              title="End Date"
              value={new Date(program.endDate).toLocaleDateString()}
              icon={<Today color="disabled" />}
            />
          </Grid>
          <Grid item md={6}>
            <PropertyItem
              title="Farmer"
              value={`${program.farmer.firstName} ${program.farmer.lastName}`}
              icon={<Person color="disabled" />}
            />
            <PropertyItem
              title="Phone"
              value="876 (841-4857"
              icon={<Phone color="disabled" />}
            />
            <PropertyItem
              title="Email"
              value="rgraham@jpsco.com"
              icon={<Email color="disabled" />}
            />
            <PropertyItem
              title="Parish"
              value="Westmoreland"
              icon={<LocationOn color="disabled" />}
            />
          </Grid>
        </Grid>
        <div className="program-status">
          {program.complete ? (
            <>
              <CheckCircle />
              <Typography>Complete</Typography>
            </>
          ) : (
            <>
              <CheckCircle />
              <Typography>Complete</Typography>
            </>
          )}
        </div>
      </Paper>
    )
  );
}

const PropertyItem = (props) => {
  const { title, value, icon } = props;
  return (
    <div className="property-wrapper">
      <div className="property-title">
        <div className="property-icon">{icon}</div>
        <Typography
          variant="subtitle1"
          color="primary"
          style={{ fontWeight: 'bold' }}
        >
          {title}:
        </Typography>
      </div>
      <Typography className="property-value">{value}</Typography>
    </div>
  );
};
