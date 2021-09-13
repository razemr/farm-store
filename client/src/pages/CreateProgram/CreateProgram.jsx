import { useHistory } from 'react-router';
import { ProgramForm } from '../../components/ProgramForm';
import { useContext, useEffect, useState } from 'react';
import { GlobalContext } from '../../context/GlobalState';
import { emptyProgram } from './emptyProgram';
import { PageHeader } from '../../components/PageHeader';
import { ProgramDialog } from '../../components/ProgramDialog';

export default function CreateProgram() {
  const [defaultProgram, setDefaultProgram] = useState();
  const [openDialog, setOpenDialog] = useState(true);
  const { postItem, listItems, farmers, crops, units, products, program } =
    useContext(GlobalContext);
  const history = useHistory();

  useEffect(() => {
    listItems(['farmers', 'crops', 'products', 'units']);
  }, []);

  const handleSubmit = (values) => {
    postItem('programs', values);
    history.push(`/programs/${program._id}`);
  };

  const handleClose = (result) => {
    if (result) setDefaultProgram(result);
    else setDefaultProgram(emptyProgram);
    
    setOpenDialog(false);
  };

  return (
    <>
      <PageHeader title="Create Program"></PageHeader>
      <ProgramForm
        program={defaultProgram}
        farmers={farmers}
        crops={crops}
        units={units}
        products={products}
        onSubmit={handleSubmit}
      />
      <ProgramDialog
        open={openDialog}
        onClose={handleClose}
      />
    </>
  );
}
