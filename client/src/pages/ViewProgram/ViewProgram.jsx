import { useEffect, useContext } from 'react';
import { GlobalContext } from '../../context/GlobalState';
import { useParams } from 'react-router-dom';
import { ProgramDetails } from '../../components/ProgramDetails';
import { MilestoneTimeline } from '../../components/MilestoneTimeline';
import { Paper } from '@material-ui/core';

export default function ViewProgram() {
  const { getItem, program } = useContext(GlobalContext);
  const { id } = useParams();

  useEffect(() => {
    getItem('programs', id);
  }, []);

  return (
    <>
      <div className="header">
        <h1>Program Detail</h1>
      </div>
      <Paper>
        <ProgramDetails program={program} />
      </Paper>
      <MilestoneTimeline milestones={program.milestones} />
    </>
  );
}
