import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { IconButton, Typography } from '@material-ui/core';
import { PageHeader } from '../../components/PageHeader';
import { Edit, Delete } from '@material-ui/icons';
import { useHistory } from 'react-router-dom';
import { httpClient } from '../../http/HttpClient';
import { ConfirmationDialog } from '../../components/ConfirmationDialog';

export default function ViewTemplate() {
  const [template, setTemplate] = useState({});
  const { id } = useParams();
  const history = useHistory();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    async function getTemplate() {
      const { data } = await httpClient.get(`/programTemplates/${id}`);
      setTemplate({ ...data.productTemplate });
    }
    getTemplate();
  }, [id]);

  const handleEdit = () => {
    history.push(`/templates/${id}/edit`);
  };

  const handleDelete = () => {
    setOpen(true);
  };

  const handleDeleteConfirmation = async () => {
    await httpClient.delete(`/programTemplates/${id}`);
    setOpen(false);
    history.push('/templates');
  };

  return (
    <>
      <PageHeader title="Template Detail">
        <IconButton onClick={handleEdit}>
          <Edit color="action" />
        </IconButton>
        <IconButton onClick={handleDelete}>
          <Delete color="action" />
        </IconButton>
      </PageHeader>
      <ConfirmationDialog
        open={open}
        title="Delete Product"
        content={
          <>
            <Typography>
              Are you sure you want to delete this template?
            </Typography>
            <Typography color="secondary">
              This will not delete programs that are based on the template..
            </Typography>
          </>
        }
        onCancel={(e) => setOpen(false)}
        onConfirm={handleDeleteConfirmation}
      />
    </>
  );
}
