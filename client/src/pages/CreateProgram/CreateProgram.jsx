import { Container } from '@material-ui/core';
import { useHistory } from 'react-router';
import { ProgramForm } from '../../components/ProgramForm';
import { useContext, useEffect } from 'react';
import { GlobalContext } from '../../context/GlobalState';
import { emptyProgram } from './emptyProgram';

export default function CreateProgram(props) {
  const defaultProgram = props.location.state || emptyProgram;
  const { postItem, listItems, farmers, crops, units, products, program } =
    useContext(GlobalContext);
  const history = useHistory();

  useEffect(() => {
    listItems(['farmers', 'crops', 'products', 'units']);
  }, []);

  const handleSubmit = (values) => {
    postItem('programs', values);
    console.log(program)
    history.push(`/programs/${program._id}`);
  };
  return (
    <Container>
      <div className="header">
        <h1>Create Program</h1>
      </div>
      <ProgramForm
        program={defaultProgram}
        farmers={farmers}
        crops={crops}
        units={units}
        products={products}
        onSubmit={handleSubmit}
      />
    </Container>
  );
}
