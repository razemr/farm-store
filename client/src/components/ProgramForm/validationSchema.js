import * as Yup from 'yup';

export const validationSchema = Yup.object({
  name: Yup.string().required('Program name is required'),
  farmer: Yup.string().required('Farmer is required'),
  startDate: Yup.date()
    .nullable()
    .typeError('Invalid Date')
    .required('Start date is required'),
  endDate: Yup.date()
    .nullable()
    .typeError('Invalid Date')
    .min(Yup.ref('startDate'), 'End date must be after start date')
    .required('End date is required'),
  acres: Yup.number().moreThan(0).required('Number of acres is required'),
  crop: Yup.string().required('Crop is required'),
  milestones: Yup.array().of(
    Yup.object().shape({
      date: Yup.date()
        .nullable()
        .typeError('Invalid Date')
        .required('Start date is required'),
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
