import './Dashboard.css';
import { Feature } from '../../components/Feature';
import { PageHeader } from '../../components/PageHeader';
import { Grid } from '@material-ui/core';
import { Assignment, PeopleAlt, Storefront, Timeline } from '@material-ui/icons';

export default function Dashboard() {
  return (
    <>
      <PageHeader title="Dashboard" />
      <Grid container spacing={4} className="feature-grid">
        <Grid item md={3}>
          <Feature icon={<Assignment/>} title="Programs" footer="Updated 20 minutes ago" value="13" color="success"/>
        </Grid>
        <Grid item md={3}>
          <Feature icon={<Timeline/>} title="Milestones" footer="Update 15 minutes ago" value="20" color="info" />
        </Grid>
        <Grid item md={3}>
          <Feature icon={<PeopleAlt/>} title="Farmers" footer="Update 15 minutes ago" value="20" color="warning" />
        </Grid>
        <Grid item md={3}>
        <Feature icon={<Storefront/>} title="Products" footer="Update 15 minutes ago" value="20" color="error" />
        </Grid>
      </Grid>
    </>
  );
}
