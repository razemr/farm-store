import { PageHeader } from '../../components/PageHeader';
import { httpClient } from '../../http/HttpClient';
import { useHistory } from 'react-router-dom';
import { ProductForm } from '../../components/ProductForm';

export default function CreateProduct() {
    const history = useHistory();

  const handleOnSubmit = async (values) => {
    await httpClient.post('/products', values);
    history.push('/products');
  };

    return (
        <>
            <PageHeader title="Create Product" />
            <ProductForm onSubmit={handleOnSubmit}
        title="New Product"
        product={{
          name: '',
          category: '',
          company: '',
          description: '',
        }}/>
        </>
    )
}
