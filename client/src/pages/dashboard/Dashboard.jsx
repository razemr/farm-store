import './Dashboard.css';
import { FeatureWidget } from '../../components/FeatureWidget';
import { PageHeader } from '../../components/PageHeader';
import { Grid } from '@material-ui/core';
import { Assignment } from '@material-ui/icons';

export default function Dashboard() {
  return (
    <>
      <PageHeader title="Dashboard" />
      <Grid container spacing={4} className="feature-grid">
        <Grid item md={3}>
          <FeatureWidget icon={<Assignment/>} title="Programs" footer="Updated 20 minutes ago" value="13" color="success"/>
        </Grid>
        <Grid item md={3}>
          <FeatureWidget />
        </Grid>
        <Grid item md={3}>
          <FeatureWidget />
        </Grid>
        <Grid item md={3}>
          <FeatureWidget />
        </Grid>
      </Grid>

      <div className="widgets">
        {/* <CalendarWidget />
        <MilestoneWidget></MilestoneWidget> */}
      </div>
    </>
  );
}
