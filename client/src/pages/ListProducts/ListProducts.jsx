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
  
  export default function ListProducts() {
    const history = useHistory();
    const [open, setOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState({});
  
    const handleAdd = () => {
      history.push('/products/create');
    };
  
    const handleOnView = (id) => {
      history.push(`/products/${id}`);
    };
  
    const handleOnEdit = (id) => {
      history.push(`/products/${id}/edit`);
    };
  
    const handleOnDelete = (product) => {
      setSelectedProduct({...product});
      setOpen(true);
    };
  
    const handleDeleteConfirmation = async () => {
      await httpClient.delete(`/products/${selectedProduct._id}`);
      history.go(0);
      setOpen(false);
    };
  
    const columns = createColumns(handleOnView, handleOnEdit, handleOnDelete);
    return (
      <>
        <PageHeader title="Products">
          <IconButton onClick={(e) => handleAdd()}>
            <Add />
          </IconButton>
        </PageHeader>
        <Container title="Products" color="primary">
          <DataGrid resource="products" columns={columns} color="primary" />
        </Container>
        <ConfirmationDialog
          open={open}
          title="Delete Product"
          content={
            <Typography>
              Are you sure you want to delete{' '}
              <bold>{` ${selectedProduct && selectedProduct.name}`}</bold>?
            </Typography>
          }
          onCancel={(e) => setOpen(false)}
          onConfirm={handleDeleteConfirmation}
        />
      </>
    );
  }