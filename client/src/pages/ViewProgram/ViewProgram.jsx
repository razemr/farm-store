import { useEffect, useContext } from 'react';
import { GlobalContext } from '../../context/GlobalState';
import { useParams } from 'react-router-dom';
import { ProgramDetailsWidget } from '../../components/ProgramDetailsWidget';
import { MilestoneTimeline } from '../../components/MilestoneTimeline';
import { Grid, IconButton } from '@material-ui/core';
import { PageHeader } from '../../components/PageHeader';
import { Edit } from '@material-ui/icons';
import { useHistory } from 'react-router-dom';

export default function ViewProgram() {
  const { getItem, program, patchItem } = useContext(GlobalContext);
  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    getItem('programs', id);
  }, []);

  const handleEdit = () => {
    history.push(`/programs/${id}/edit`);
  };


  const handleCheck = (status, id) => {
    patchItem('programs', program._id, {
      target: 'milestoneStatus',
      status,
      id,
    });
  };

  return (
    <>
      <PageHeader title="Program Detail">
        <IconButton onClick={handleEdit}>
          <Edit color="action" fontSize="small" />
        </IconButton>
      </PageHeader>
      <ProgramDetailsWidget />
      <MilestoneTimeline
            align="alternate"
            onCheck={handleCheck}
          />
      {/* <Grid container spacing={4}>
        <Grid item xs={6}>
          
        </Grid>
        <Grid item xs={6}>
          
        </Grid>
      </Grid> */}
    </>
  );
}
