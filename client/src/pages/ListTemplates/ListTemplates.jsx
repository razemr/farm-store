import { IconButton, Typography } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import { useHistory } from 'react-router-dom';
import { useState } from 'react';
import { PageHeader } from '../../components/PageHeader';
import { ConfirmationDialog } from '../../components/ConfirmationDialog';
import { Container } from '../../components/Container';
import { DataGrid } from '../../components/DataGrid';
import { createColumns } from './columns';
import { httpClient } from '../../http/HttpClient';

export default function ListTemplates() {
  const history = useHistory();

  const handleAdd = () => {
    history.push('/templates/create');
  };

  const handleView = (id) => {
    history.push(`/templates/${id}`);
  };

  const columns = createColumns(handleView);
  return (
    <>
      <PageHeader title="Program Templates">
        <IconButton onClick={(e) => handleAdd()}>
          <Add />
        </IconButton>
      </PageHeader>
      <Container title="Program Templates" color="primary">
        <DataGrid
          resource="programTemplates"
          columns={columns}
          color="primary"
          searchPlaceholder="Search program templates"
        />
      </Container>
    </>
  );
}
