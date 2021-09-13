import './ListPrograms.css';
import { Input, InputAdornment, IconButton } from '@material-ui/core';
import { ProgramTable } from '../../components/ProgramTable';
import { Search, Add } from '@material-ui/icons';
import { useHistory } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { GlobalContext } from '../../context/GlobalState';
import { PageHeader } from '../../components/PageHeader';

export default function ListPrograms() {
  const history = useHistory();
  const { listItems, programs } = useContext(GlobalContext);

  useEffect(() => {
    listItems('programs');
  }, []);

  const handleOnView = (id) => {
    history.push(`/programs/${id}`);
  };

  const handleAdd = () => {
    history.push(`/programs/create`);
  };

  const handleOnEdit = () => {};

  return (
    <>
      <PageHeader title="Programs">
        <Input
          placeholder="Searh programs"
          startAdornment={
            <InputAdornment position="start">
              <Search color="disabled" />
            </InputAdornment>
          }
        />
        <IconButton onClick={(e) => handleAdd()}>
          <Add />
        </IconButton>
      </PageHeader>
      <ProgramTable
        onView={handleOnView}
        onEdit={handleOnEdit}
        programs={programs}
      />
    </>
  );
}
