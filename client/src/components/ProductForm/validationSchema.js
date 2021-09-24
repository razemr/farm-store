import * as Yup from 'yup';

export const validationSchema = Yup.object({
  name: Yup.string().required('Product name is required'),
  category: Yup.string().required('Category is required'),
  company: Yup.string().required('Company is required')
});