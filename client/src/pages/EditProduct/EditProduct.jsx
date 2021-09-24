import { useEffect, useState } from 'react';
import { PageHeader } from '../../components/PageHeader';
import { useParams, useHistory } from 'react-router';
import { httpClient } from '../../http/HttpClient';
import { ProductForm } from '../../components/ProductForm';

export default function EditProduct() {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const history = useHistory();

  useEffect(() => {
    async function getProduct() {
      try {
        const { data } = await httpClient.get(`/products/${id}`);
        setProduct({ ...data.product });
      } catch (error) {
        //Toast error
      }
    }
    getProduct();
  }, [id]);

  const handleSubmit = async (values) => {
    try {
      const { data } = await httpClient.put(`/products/${id}`, values);
      history.push(`/products/${data.product._id}`);
    } catch {
      //Toast error
    }
  };

  return (
    <>
      <PageHeader title="Edit Product"></PageHeader>
      <ProductForm
        product={
          Object.keys(product).length > 0
            ? {
                ...product,
                company: product.company._id,
                category: product.category._id,
              }
            : ''
        }
        onSubmit={handleSubmit}
        title="Edit Product"
      />
    </>
  );
}
