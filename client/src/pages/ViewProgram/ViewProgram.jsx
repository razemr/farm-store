import { useEffect, useContext } from 'react';
import { GlobalContext } from '../../context/GlobalState';
import { useParams } from 'react-router-dom';
import { ProgramDetailsWidget } from '../../components/ProgramDetailsWidget';
import { MilestoneTimeline } from '../../components/MilestoneTimeline';
import { Grid, IconButton } from '@material-ui/core';
import { PageHeader } from '../../components/PageHeader';
import { Edit } from '@material-ui/icons';
import { useHistory } from 'react-router-dom';
import { httpClient } from '../../http/HttpClient';
import { useState } from 'react';

export default function ViewProgram() {
  const [program, setProgram] = useState({});
  const { id } = useParams();
  const history = useHistory();

  useEffect(async () => {
    const { data } = await httpClient.get(`/programs/${id}`);
    setProgram({ ...data.program });
  }, []);

  const handleEdit = () => {
    history.push(`/programs/${id}/edit`);
  };

  const handleCheck = async (status, id) => {
    const {data} = await httpClient.patch(`/programs/${program._id}`, {
      target: 'milestoneStatus',
      status,
      id,
    });
    setProgram({ ...data.program });
  };

  return (
    <>
      <PageHeader title="Program Detail">
        <IconButton onClick={handleEdit}>
          <Edit color="action" fontSize="small" />
        </IconButton>
      </PageHeader>
      <ProgramDetailsWidget program={program}/>
      <MilestoneTimeline align="alternate" onCheck={handleCheck} milestones={program.milestones} nextMilestone={program.nextMilestone}/>
    </>
  );
}
