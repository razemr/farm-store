import './Dashboard.css';
import { FeatureWidget } from '../../components/FeatureWidget';
import { PageHeader } from '../../components/PageHeader';
import { Grid } from '@material-ui/core';

export default function Dashboard() {
  return (
    <>
      <PageHeader title="Dashboard" />
      <Grid container spacing={2} className="feature-grid">
        <Grid item md={4}>
          <FeatureWidget />
        </Grid>
        <Grid item md={4}>
          <FeatureWidget />
        </Grid>
        <Grid item md={4}>
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
