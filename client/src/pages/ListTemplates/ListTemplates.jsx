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
  
  export default function ListTemplates() {
    const history = useHistory();
    const [open, setOpen] = useState(false);
    const [selectedProgramTemplate, setSelectedProgramTemplate] = useState({});
  
    const handleAdd = () => {
      history.push('/programTemplates/create');
    };
  
    const handleOnView = (id) => {
      history.push(`/programTemplates/${id}`);
    };
  
    const handleOnEdit = (id) => {
      history.push(`/programTemplates/${id}/edit`);
    };
  
    const handleOnDelete = (programTemplate) => {
      setSelectedProgramTemplate({...programTemplate});
      setOpen(true);
    };
  
    const handleDeleteConfirmation = async () => {
      await httpClient.delete(`/programTemplates/${selectedProgramTemplate._id}`);
      history.go(0);
      setOpen(false);
    };
  
    const columns = createColumns(handleOnView, handleOnEdit, handleOnDelete);
    return (
      <>
        <PageHeader title="Program Templates">
          <IconButton onClick={(e) => handleAdd()}>
            <Add />
          </IconButton>
        </PageHeader>
        <Container title="Program Templates" color="primary">
          <DataGrid resource="programTemplates" columns={columns} color="primary" searchPlaceholder="Search program templates"/>
        </Container>
        <ConfirmationDialog
          open={open}
          title="Delete Program Template"
          content={
            <Typography>
              Are you sure you want to delete{' '}
              <bold>{` ${selectedProgramTemplate && selectedProgramTemplate.name}`}</bold>?
            </Typography>
          }
          onCancel={(e) => setOpen(false)}
          onConfirm={handleDeleteConfirmation}
        />
      </>
    );
  }
