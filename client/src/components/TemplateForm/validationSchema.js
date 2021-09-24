import * as Yup from 'yup';

export const validationSchema = Yup.object({
  name: Yup.string().required('Template name is required'),
  description: Yup.string().required('Description is required'),
  company: Yup.string().required('Company is required'),
  crop: Yup.string().required('Crop is required'),
  milestoneTemplates: Yup.array().of(
    Yup.object().shape({
      daysFromStart: Yup.number()
        .required('Number of days from start is required'),
      productApplications: Yup.array().of(
        Yup.object().shape({
          product: Yup.string().required('Product is required'),
          quantity: Yup.number()
            .moreThan(0, 'Quantity must be grater than zero')
            .required('Quantity is required'),
          unit: Yup.string().required('Unit is required'),
        }),
      ),
    }),
  ),
});
