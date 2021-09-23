import React from 'react';
import { FarmerForm } from '../../components/FarmerForm';
import { PageHeader } from '../../components/PageHeader';
import { httpClient } from '../../http/HttpClient';
import { useHistory } from 'react-router-dom';

export default function CreateFarmer() {
  const history = useHistory();

  const handleOnSubmit = async (values) => {
    await httpClient.post('/farmers', values);
    history.push('/farmers');
  };
  return (
    <>
      <PageHeader title="Create Farmer" />
      <FarmerForm
        onSubmit={handleOnSubmit}
        title="New Farmer"
        farmer={{
          firstName: '',
          lastName: '',
          dateOfBirth: null,
          sex: '',
          phoneNumber: '',
          emailAddress: '',
          address: '',
          parish: '',
          radaExtension: '',
          crops: [],
        }}
      ></FarmerForm>
    </>
  );
}
