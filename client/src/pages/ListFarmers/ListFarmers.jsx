import {
  IconButton,
  Typography,
} from '@material-ui/core';
import { Add } from '@material-ui/icons';
import { useHistory} from 'react-router-dom';
import { useState } from 'react';
import { PageHeader } from '../../components/PageHeader';
import { ConfirmationDialog } from '../../components/ConfirmationDialog';
import { Container } from '../../components/Container';
import { DataGrid } from '../../components/DataGrid';
import { createColumns } from './columns';
import { httpClient } from '../../http/HttpClient';

export default function ListFarmers() {
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const [selectedFarmer, setSelectedFarmer] = useState({});

  const handleAdd = () => {
    history.push('/farmers/create');
  };

  const handleOnView = (id) => {
    history.push(`/farmers/${id}`);
  };

  const handleOnEdit = (id) => {
    history.push(`/farmers/${id}/edit`);
  };

  const handleOnDelete = (farmer) => {
    setSelectedFarmer({...farmer});
    setOpen(true);
  };

  const handleDeleteConfirmation = async () => {
    await httpClient.delete(`/farmers/${selectedFarmer._id}`);
    history.go(0);
    setOpen(false);
  };

  const columns = createColumns(handleOnView, handleOnEdit, handleOnDelete);
  return (
    <>
      <PageHeader title="Farmers">
        <IconButton onClick={(e) => handleAdd()}>
          <Add />
        </IconButton>
      </PageHeader>
      <Container title="Farmers" color="primary">
        <DataGrid resource="farmers" columns={columns} color="primary" />
      </Container>
      <ConfirmationDialog
        open={open}
        title="Delete Farmer"
        content={
          <Typography>
            Are you sure you want to delete{' '}
            <bold>{` ${selectedFarmer && selectedFarmer.name}`}</bold>?
          </Typography>
        }
        onCancel={(e) => setOpen(false)}
        onConfirm={handleDeleteConfirmation}
      />
    </>
  );
}
