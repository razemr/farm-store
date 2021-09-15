import { useEffect, useContext } from 'react';
import { GlobalContext } from '../../context/GlobalState';
import { PageHeader } from '../../components/PageHeader';
import { ProgramForm } from '../../components/ProgramForm';
import { useParams, useHistory } from 'react-router';
import { compareDates } from '../../utils/compareDates';

export default function EditProgram() {
  const { id } = useParams();
  const { getItem, listItems, editItem, program } = useContext(GlobalContext);
  const history = useHistory();

  useEffect(() => {
    getItem('programs', id);
    listItems(['farmers', 'crops', 'products', 'units']);
  }, []);

  const handleSubmit = (values) => {
    editItem('programs', id, values);
    history.push(`/programs/${id}`);
  };

  return (
    <>
      <PageHeader title="Edit Program"></PageHeader>
      <ProgramForm
        program={Object.keys(program).length > 0 && {
          ...program,
          crop: program.crop._id,
          farmer: program.farmer._id,
          milestones: program.milestones.sort((a, b) => compareDates(new Date(a.date), new Date(b.date))).map(
            ({ _id, date, productApplications }) => ({
              _id,
              date,
              productApplications: productApplications.map(
                ({ product, quantity, unit }) => ({
                  product: product._id,
                  unit: unit._id,
                  quantity,
                }),
              ),
            }),
          ),
        }}
        onSubmit={handleSubmit}
      />
    </>
  );
}
