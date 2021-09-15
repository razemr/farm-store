import { Paper, Typography, Grid } from '@material-ui/core';
import {
  AspectRatio,
  ContactPhone,
  Description,
  Email,
  LocationOn,
  Person,
  Phone,
  Today,
} from '@material-ui/icons';
import Card from '../Card/Card';
import './ProgramDetailsWidget.css';
import { GlobalContext } from '../../context/GlobalState';
import { useContext } from 'react';

export default function ProgramDetails() {
  const { program } = useContext(GlobalContext);

  return (
    Object.keys(program).length > 0 && (
      <>
        <Paper elevation={1} className="details-wrapper">
          <img
            className="details-image"
            src={
              Boolean(program.crop) &&
              `${process.env.PUBLIC_URL}/images/${program.crop.name}.jpg`
            }
            alt=""
          />
          <Typography
            align="center"
            variant="h6"
            color="textSecondary"
            className="crop-name"
          >
            {program.crop.name} - Dasheen PNMS
          </Typography>
          <Typography align="center" variant="h4">
            {program.name}
          </Typography>
          <Typography
            align="center"
            variant="body1"
            paragraph
            className="program-description"
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </Typography>
        </Paper>

        <Grid container spacing={2} style={{ marginTop: '16px' }}>
          <Grid item xs={6}>
            <Card label={<Description fontSize="large"/>} color="primary" header="Details">
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
            </Card>
          </Grid>
          <Grid item xs={6}>
          <Card label={<ContactPhone fontSize="large"/>} color="primary" header="Contact">
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
          </Card>
          </Grid>
        </Grid>
      </>
    )
  );
}

const PropertyItem = (props) => {
  const { title, value, icon } = props;
  return (
    <div className="property-wrapper">
      <div className="property-title">
        <div className="property-icon">{icon}</div>
        <Typography variant="subtitle1" color="primary">
          {title}:
        </Typography>
      </div>
      <Typography className="property-value">{value}</Typography>
    </div>
  );
};
