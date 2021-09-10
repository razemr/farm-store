import { useEffect, useContext } from 'react';
import { GlobalContext } from '../../context/GlobalState';
import { useParams } from 'react-router-dom';
import { ProgramDetails } from '../../components/ProgramDetails';
import { MilestoneTimeline } from '../../components/MilestoneTimeline';
import { Paper } from '@material-ui/core';

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
      id
    });
  };

  return (
    <>
      <div className="header">
        <h1>Program Detail</h1>
      </div>
      <Paper>
        <ProgramDetails program={program} />
      </Paper>
      <MilestoneTimeline
        milestones={program.milestones}
        nextMilestone={program.nextMilestone}
        onCheck={handleCheck}
      />
    </>
  );
}
