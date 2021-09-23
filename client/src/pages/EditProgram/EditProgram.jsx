import { useEffect, useState } from 'react';
import { PageHeader } from '../../components/PageHeader';
import { ProgramForm } from '../../components/ProgramForm';
import { useParams, useHistory } from 'react-router';
import { compareDates } from '../../utils/compareDates';
import { httpClient } from '../../http/HttpClient';

export default function EditProgram() {
  const { id } = useParams();
  const [program, setProgram] = useState({});
  const history = useHistory();

  useEffect(() => {
    async function getProgam() {
      try {
        const { data } = await httpClient.get(`/programs/${id}`);
        setProgram({ ...data.program });
      } catch (error) {
        //Toast error
      }
    }
    getProgam();
  }, [id]);

  const handleSubmit = async (values) => {
    try {
      const { data } = await httpClient.put(`/programs/${id}`, values);
      history.push(`/programs/${data.program._id}`);
    } catch {
      //Toast error
    }
  };

  return (
    <>
      <PageHeader title="Edit Program"></PageHeader>
      <ProgramForm
        program={
          Object.keys(program).length > 0
            ? {
                ...program,
                crop: program.crop,
                farmer: program.farmer._id,
                milestones: program.milestones
                  .sort((a, b) =>
                    compareDates(new Date(a.date), new Date(b.date)),
                  )
                  .map(({ _id, date, productApplications }) => ({
                    _id,
                    date,
                    productApplications: productApplications.map(
                      ({ product, quantity, unit }) => ({
                        product: product._id,
                        unit: unit._id,
                        quantity,
                      }),
                    ),
                  })),
              }
            : ''
        }
        onSubmit={handleSubmit}
      />
    </>
  );
}
