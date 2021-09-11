import { useEffect, useContext } from 'react';
import { GlobalContext } from '../../context/GlobalState';
import { useParams } from 'react-router-dom';
import { ProgramDetailsWidget } from '../../components/ProgramDetailsWidget';
import { MilestoneTimeline } from '../../components/MilestoneTimeline';
import { Grid, Paper } from '@material-ui/core';
import { PageHeader } from '../../components/PageHeader';

export default function ViewProgram() {
  const { getItem, program, patchItem } = useContext(GlobalContext);
  const { id } = useParams();

  useEffect(() => {
    getItem('programs', id);
  }, []);

  const handleCheck = (status, id) => {
    patchItem('programs', program._id, {
      target: 'milestoneStatus',
      status,
      id,
    });
  };

  return (
    <>
      <PageHeader title="Program Detail"></PageHeader>
      <Grid container spacing={4}>
        <Grid item xs={6}>
          <Paper>
            <ProgramDetailsWidget program={program} />
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <MilestoneTimeline
            align="left"
            milestones={program.milestones}
            nextMilestone={program.nextMilestone}
            onCheck={handleCheck}
          />
        </Grid>
      </Grid>
    </>
  );
}
