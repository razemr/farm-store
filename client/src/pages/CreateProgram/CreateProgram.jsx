import { useHistory } from 'react-router';
import { ProgramForm } from '../../components/ProgramForm';
import { useState } from 'react';
import { emptyProgram } from './emptyProgram';
import { PageHeader } from '../../components/PageHeader';
import ProgramDialog from './ProgramDialog';
import { httpClient } from '../../http/HttpClient';

export default function CreateProgram() {
  const [defaultProgram, setDefaultProgram] = useState();
  const [openDialog, setOpenDialog] = useState(true);
  const history = useHistory();

  const handleSubmit = async (values) => {
    try {
      const { data } = await httpClient.post('/programs', values);
      history.push(`/programs/${data.program._id}`);
    } catch {
      //Toast error
    }
  };

  const handleClose = (result) => {
    if (result) setDefaultProgram(result);
    else setDefaultProgram(emptyProgram);

    setOpenDialog(false);
  };

  return (
    <>
      <PageHeader title="Create Program"></PageHeader>
      <ProgramForm program={defaultProgram} onSubmit={handleSubmit} />
      <ProgramDialog open={openDialog} onClose={handleClose} />
    </>
  );
}
