import { useEffect, useContext } from 'react';
import { GlobalContext } from '../../context/GlobalState';
import { MilestoneTimeline } from '../../components/MilestoneTimeline';
import { IconButton } from '@material-ui/core';
import { Event, List, Timeline } from '@material-ui/icons';
import { PageHeader } from '../../components/PageHeader';

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
      <PageHeader title="Milestones">
        <IconButton>
          <Event />
        </IconButton>
        <IconButton>
          <List />
        </IconButton>
        <IconButton>
          <Timeline />
        </IconButton>
      </PageHeader>
      <MilestoneTimeline
        align="alternate"
        milestones={milestones}
        onCheck={handleCheck}
      />
    </>
  );
}
