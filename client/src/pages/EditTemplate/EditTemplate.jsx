import { useEffect, useState } from 'react';
import { PageHeader } from '../../components/PageHeader';
import { TemplateForm } from '../../components/TemplateForm';
import { useParams, useHistory } from 'react-router';
import { httpClient } from '../../http/HttpClient';

export default function EditProgram() {
  const { id } = useParams();
  const [template, setTemplate] = useState({});
  const history = useHistory();

  useEffect(() => {
    async function getTemplate() {
      try {
        const { data } = await httpClient.get(`/programTemplates/${id}`);
        setTemplate({ ...data.programTemplate });
        console.log({ ...data.programTemplate })
      } catch (error) {
        //Toast error
      }
    }
    getTemplate();
  }, [id]);

  const handleSubmit = async (values) => {
    try {
      const { data } = await httpClient.put(`/programTemplates/${id}`, values);
      history.push(`/templates/${data.programTemplate._id}`);
    } catch {
      //Toast error
    }
  };

  return (
    <>
      <PageHeader title="Edit Program Template"></PageHeader>
      <TemplateForm
        title={`Edit - ${template.name}`}
        template={
          Object.keys(template).length > 0
            ? {
                ...template,
                crop: template.crop._id,
                company: template.company._id,
                milestoneTemplates: template.milestoneTemplates.map((t) => ({
                  ...t,
                  productApplications: t.productApplications
                    ? t.productApplications.map((application) => ({
                        ...application,
                        product: application.product._id,
                        unit: application.unit._id,
                      }))
                    : [],
                })),
              }
            : ''
        }
        onSubmit={handleSubmit}
      />
    </>
  );
}
