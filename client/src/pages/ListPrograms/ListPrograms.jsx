import './ListPrograms.css';
import { IconButton} from '@material-ui/core';
import { Add } from '@material-ui/icons';
import { useHistory} from 'react-router-dom';
import { PageHeader } from '../../components/PageHeader';
import { Container } from '../../components/Container';
import { DataGrid } from '../../components/DataGrid';
import { createColumns } from './columns';

export default function ListPrograms() {
  const history = useHistory();

  const handleAdd = () => {
    history.push('/programs/create');
  };

  const handleView = (id) => {
    history.push(`/programs/${id}`);
  };

  const columns = createColumns(handleView);

  return (
    <>
      <PageHeader title="Programs">
        <IconButton onClick={(e) => handleAdd()}>
          <Add />
        </IconButton>
      </PageHeader>
      <Container title="Programs" color="primary">
        <DataGrid resource="programs" columns={columns} color="primary" />
      </Container>
    </>
  );
}
