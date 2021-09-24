import { TemplateForm } from '../../components/TemplateForm';
import { PageHeader } from '../../components/PageHeader';
import { httpClient } from '../../http/HttpClient';
import { useHistory } from 'react-router-dom';

export default function CreateTemplate() {
  const history = useHistory();

  const handleOnSubmit = async (values) => {
    await httpClient.post('/programTemplates', values);
    history.push('/templates');
  };
  return (
    <>
      <PageHeader title="Create Template" />
      <TemplateForm
        onSubmit={handleOnSubmit}
        title="New Template"
        template={{
          name: '',
          description: '',
          crop: '',
          company: '',
          milestoneTemplates: [
            {
              daysFromStart: '',
              productApplications: [
                {
                  product: '',
                  quantity: '',
                  unit: '',
                },
              ],
            },
          ],
        }}
      ></TemplateForm>
    </>
  );
}
