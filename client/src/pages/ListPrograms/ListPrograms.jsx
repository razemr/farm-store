import './ListPrograms.css';
import { IconButton, Typography} from '@material-ui/core';
import { Add } from '@material-ui/icons';
import { useHistory} from 'react-router-dom';
import { useState } from 'react';
import { PageHeader } from '../../components/PageHeader';
import { ConfirmationDialog } from '../../components/ConfirmationDialog';
import { Container } from '../../components/Container';
import { DataGrid } from '../../components/DataGrid';
import { createColumns } from './columns';
import { httpClient } from '../../http/HttpClient';

export default function ListPrograms() {
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState({});

  const handleAdd = () => {
    history.push('/programs/create');
  };

  const handleOnView = (id) => {
    history.push(`/programs/${id}`);
  };

  const handleOnEdit = (id) => {
    history.push(`/programs/${id}/edit`);
  };

  const handleOnDelete = (program) => {
    setSelectedProgram({...program});
    setOpen(true);
  };

  const handleDeleteConfirmation = async () => {
    await httpClient.delete(`/programs/${selectedProgram._id}`);
    history.go(0);
    setOpen(false);
  };

  const columns = createColumns(handleOnView, handleOnEdit, handleOnDelete);

  return (
    <>
      <PageHeader title="Programs">
        <IconButton onClick={(e) => handleAdd()}>
          <Add />
        </IconButton>
      </PageHeader>
      <Container title="Programs" color="primary">
        <DataGrid resource="programs" columns={columns} color="primary" />
      </Container>
      <ConfirmationDialog
        open={open}
        title="Delete Program"
        content={
          <Typography>
            Are you sure you want to delete{' '}
            <bold>{` ${selectedProgram && selectedProgram.name}`}</bold>?
          </Typography>
        }
        onCancel={(e) => setOpen(false)}
        onConfirm={handleDeleteConfirmation}
      />
    </>
  );
}
