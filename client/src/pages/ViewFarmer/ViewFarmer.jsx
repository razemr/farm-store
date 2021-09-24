import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { IconButton, Typography } from '@material-ui/core';
import { PageHeader } from '../../components/PageHeader';
import {
  Edit,
  Delete,
} from '@material-ui/icons';
import { useHistory } from 'react-router-dom';
import { httpClient } from '../../http/HttpClient';
import { ConfirmationDialog } from '../../components/ConfirmationDialog';

export default function ViewFarmer() {
  const [farmer, setFarmer] = useState({});
  const { id } = useParams();
  const history = useHistory();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    async function getFarmer() {
      const { data } = await httpClient.get(`/farmers/${id}`);
      setFarmer({ ...data.farmer });
    }
    getFarmer();
  }, [id]);

  const handleEdit = () => {
    history.push(`/farmers/${id}/edit`);
  };

  const handleDelete = () => {
    setOpen(true);
  };

  const handleDeleteConfirmation = async () => {
    await httpClient.delete(`/farmers/${farmer._id}`);
    setOpen(false);
    history.push('/farmers');
  };

  return (
    <>
      <PageHeader title="Farmer Detail">
        <IconButton onClick={handleEdit}>
          <Edit color="action" />
        </IconButton>
        <IconButton onClick={handleDelete}>
          <Delete color="action" />
        </IconButton>
      </PageHeader>

      <ConfirmationDialog
        open={open}
        title="Delete Farmer"
        content={
          <>
          <Typography>Are you sure you want to delete this farmer?</Typography>
          <Typography color="secondary">This will also remove all of the farmer's programs.</Typography>
          </>
        }
        onCancel={(e) => setOpen(false)}
        onConfirm={handleDeleteConfirmation}
      />
    </>
  );
}
