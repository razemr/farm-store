import './ListPrograms.css';
import {
  Input,
  InputAdornment,
  IconButton,
  Typography,
  Button,
} from '@material-ui/core';
import { ProgramTable } from '../../components/ProgramTable';
import { Search, Add } from '@material-ui/icons';
import { useHistory } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { GlobalContext } from '../../context/GlobalState';
import { PageHeader } from '../../components/PageHeader';
import { Dialog } from '../../components/Dialog';

export default function ListPrograms() {
  const history = useHistory();
  const { listItems, programs, deleteItem } = useContext(GlobalContext);
  const [selectedProgram, setSelectedProgram] = useState();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    listItems('programs');
  }, []);

  const handleOnView = (id) => {
    history.push(`/programs/${id}`);
  };

  const handleAdd = () => {
    history.push(`/programs/create`);
  };

  const handleOnEdit = (id) => {
    history.push(`/programs/${id}/edit`);
  };

  const handleOnDelete = (program) => {
    setSelectedProgram(program);
    setOpen(true);
  };

  const handleDeleteConfirmation = () => {
    deleteItem('programs', selectedProgram._id);
    setOpen(false);
  };

  return (
    <>
      <PageHeader title="Programs">
        <Input
          placeholder="Searh programs"
          startAdornment={
            <InputAdornment position="start">
              <Search color="disabled" />
            </InputAdornment>
          }
        />
        <IconButton onClick={(e) => handleAdd()}>
          <Add />
        </IconButton>
      </PageHeader>
      <ProgramTable
        onView={handleOnView}
        onEdit={handleOnEdit}
        onDelete={handleOnDelete}
        programs={programs}
      />
      <Dialog
        open={open}
        title="Confirm Deletion"
        content={
          <div>
            <Typography variant="body1" display="inline">
              Are you sure you want to delete
            </Typography>
            <Typography variant="h5" display="inline">
              {` ${selectedProgram && selectedProgram.name}`}
            </Typography>
            <Typography variant="body1" display="inline">
              ?
            </Typography>
          </div>
        }
        actions={
          <>
            <Button onClick={(e) => setOpen(false)}>Cancel</Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleDeleteConfirmation}
            >
              Confirm
            </Button>
          </>
        }
      />
    </>
  );
}
