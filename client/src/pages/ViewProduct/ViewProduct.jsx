import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { IconButton, Typography } from '@material-ui/core';
import { PageHeader } from '../../components/PageHeader';
import { Edit, Delete } from '@material-ui/icons';
import { useHistory } from 'react-router-dom';
import { httpClient } from '../../http/HttpClient';
import { ConfirmationDialog } from '../../components/ConfirmationDialog';

export default function ViewProduct() {
  const [product, setProduct] = useState({});
  const { id } = useParams();
  const history = useHistory();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    async function getProduct() {
      const { data } = await httpClient.get(`/products/${id}`);
      setProduct({ ...data.product });
    }
    getProduct();
  }, [id]);

  const handleEdit = () => {
    history.push(`/products/${id}/edit`);
  };

  const handleDelete = () => {
    setOpen(true);
  };

  const handleDeleteConfirmation = async () => {
    await httpClient.delete(`/products/${product._id}`);
    setOpen(false);
    history.push('/products');
  };

  return (
    <>
      <PageHeader title="Product Detail">
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
          <Typography>Are you sure you want to delete this product?</Typography>
          <Typography color="secondary">This will also remove all applications of this product in templates and programs.</Typography>
          </>
        }
        onCancel={(e) => setOpen(false)}
        onConfirm={handleDeleteConfirmation}
      />
    </>
  );
}
