import {
  IconButton,
  Typography,
} from '@material-ui/core';
import { Add } from '@material-ui/icons';
import { useHistory} from 'react-router-dom';
import { useState } from 'react';
import { PageHeader } from '../../components/PageHeader';
import { Container } from '../../components/Container';
import { DataGrid } from '../../components/DataGrid';
import { createColumns } from './columns';

export default function ListFarmers() {
  const history = useHistory();
  const [open, setOpen] = useState(false);

  const handleAdd = () => {
    history.push('/farmers/create');
  };

  const handleOnView = (id) => {
    history.push(`/farmers/${id}`);
  };

  const columns = createColumns(handleOnView);
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
    </>
  );
}
