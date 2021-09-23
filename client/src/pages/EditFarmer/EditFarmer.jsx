import { useEffect, useState } from 'react';
import { PageHeader } from '../../components/PageHeader';
import { useParams, useHistory } from 'react-router';
import { httpClient } from '../../http/HttpClient';
import { FarmerForm } from '../../components/FarmerForm';

export default function EditFarmer() {
  const { id } = useParams();
  const [farmer, setFarmer] = useState({});
  const history = useHistory();

  useEffect(() => {
    async function getFarmer() {
      try {
        const { data } = await httpClient.get(`/farmers/${id}`);
        setFarmer({ ...data.farmer });
      } catch (error) {
        //Toast error
      }
    }
    getFarmer();
  }, [id]);

  const handleSubmit = async (values) => {
    try {
      const { data } = await httpClient.put(`/farmers/${id}`, values);
      history.push(`/farmers/${data.farmer._id}`);
    } catch {
      //Toast error
    }
  };

  return (
    <>
      <PageHeader title="Edit Program"></PageHeader>
      <FarmerForm
        onSubmit={handleSubmit}
        title="Edit Farmer"
        farmer={
          Object.keys(farmer).length > 0
            ? {
                ...farmer,
                parish: farmer.parish._id,
                radaExtension: farmer.radaExtension._id,
              }
            : ''
        }
      />
    </>
  );
}
