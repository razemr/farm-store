import './ListPrograms.css';
import { Button, Input, InputAdornment, Container } from '@material-ui/core';
import { ProgramTable } from '../../components/ProgramTable';
import { Search, Add } from '@material-ui/icons';
import { useHistory } from 'react-router-dom';
import { ProgramDialog } from '../../components/ProgramDialog';
import { useState, useContext, useEffect } from 'react';
import { GlobalContext } from '../../context/GlobalState';
import { useStyles } from './useStyles';
import { PageHeader } from '../../components/PageHeader';

export default function ListPrograms() {
  const classes = useStyles();
  const [openDialog, setOpenDialog] = useState(false);
  const history = useHistory();
  const { listItems, programs } = useContext(GlobalContext);

  useEffect(() => {
    listItems('programs');
  }, []);

  const handleOnView = (id) => {
    history.push(`/programs/${id}`);
  };

  const handleOnEdit = () => {};

  const handleOnManual = () => {
    setOpenDialog(false);
    history.push('/programs/create');
  };

  const handleOnTemplate = (program) => {
    setOpenDialog(false);
    history.push({ pathname: '/programs/create', state: { ...program } });
  };

  return (
    <>
      {/* <div className="header">
        <h1>Programs</h1>
        <div className="header-actions">
          <Input
            placeholder="Searh programs"
            startAdornment={
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            }
          />
          <Button
            variant="contained"
            color="primary"
            onClick={() => setOpenDialog(true)}
            className={classes.createButton}
            startIcon={<Add/>}
          >
            Create
          </Button>
        </div>
      </div> */}
      <PageHeader title="Programs"></PageHeader>
      <ProgramTable
        onView={handleOnView}
        onEdit={handleOnEdit}
        programs={programs}
      />
      <ProgramDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        onManual={handleOnManual}
        onTemplate={handleOnTemplate}
      />
    </>
  );
}
