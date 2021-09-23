import * as Yup from 'yup';
import regex from '../../utils/regex';

export const validationSchema = Yup.object({
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('First name is required'),
  dateOfBirth: Yup.date().nullable().typeError('Invalid Date'),
  sex: Yup.mixed().oneOf(['Male', 'Female']).required('Gender is required'),
  phoneNumber: Yup.string().matches(
   regex.phoneRegex,
   'Phone number is not valid',
  ).required('Phone number is required'),
  emailAddress: Yup.string().matches(
   regex.emailRegex,
   'Email address is not valid',
  ),
  parish: Yup.string().required('Parish is required'),
  radaExtension: Yup.string().required('Extension is required'),
  address: Yup.string().required('Address is required'),
  crops: Yup.array().of(Yup.string()).min(1, 'At least one crop is required'),
});
