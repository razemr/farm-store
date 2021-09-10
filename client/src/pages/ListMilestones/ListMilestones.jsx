import { useEffect, useContext } from 'react';
import { GlobalContext } from '../../context/GlobalState';
import { MilestoneTimeline } from '../../components/MilestoneTimeline';
import { IconButton } from '@material-ui/core';
import { Event, List, Timeline } from '@material-ui/icons';

export default function ListMilestones() {
  const { listItems, milestones } = useContext(GlobalContext);

  useEffect(() => {
    listItems('milestones');
  }, []);

  const handleCheck = (status, id) => {
    console.log(status, id);
  };

  return (
    <>
      <div className="header">
        <h1>Latest Milestones</h1>
        <div>
          <IconButton>
            <Event />
          </IconButton>
          <IconButton>
            <List />
          </IconButton>
          <IconButton>
            <Timeline />
          </IconButton>
        </div>
      </div>
      <MilestoneTimeline milestones={milestones} onCheck={handleCheck} />
    </>
  );
}
