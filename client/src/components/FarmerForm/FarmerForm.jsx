import { Formik } from 'formik';
import { Grid, TextField, Button, makeStyles } from '@material-ui/core';
import { validationSchema } from './validationSchema';
import { PeopleAlt } from '@material-ui/icons';
import { Card } from '../Card';
import { SelectControl } from '../FormControls/SelectControl';
import { DatePickerControl } from '../FormControls/DatePickerControl';
import { Autocomplete } from '@material-ui/lab';
import { useContext } from 'react';
import { GlobalContext } from '../../context/GlobalState';
import { CheckboxGroupControl } from '../FormControls/CheckboxGroupControl';

const useStyles = makeStyles({
  form: {
    '& .MuiFormControl-root': {
      width: '100%',
      marginBottom: '16px !important',
    },
  },
});

export default function FarmerForm(props) {
  const { farmer, onSubmit, title } = props;
  const classes = useStyles();
  const { radaExtensions, parishes, crops } = useContext(GlobalContext);

  return farmer ? (
    <Grid container justifyContent="center">
      <Grid item xs={8}>
        <Formik
          enableReinitialize={true}
          initialValues={farmer}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            onSubmit(values);
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            setFieldValue,
          }) => (
            <form className={classes.form}>
              <Card
                header={title}
                label={<PeopleAlt fontSize="large" />}
                color="primary"
              >
                <Grid container spacing={10}>
                  <Grid item xs={6}>
                    <TextField
                      label="First Name"
                      name="firstName"
                      required
                      value={values.firstName}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={touched.firstName && Boolean(errors.firstName)}
                      helperText={touched.firstName ? errors.firstName : null}
                    />
                    <DatePickerControl
                      label="Date of Birth"
                      name="dateOfBirth"
                      value={values.dateOfBirth}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={touched.dateOfBirth && Boolean(errors.dateOfBirth)}
                      helperText={
                        touched.dateOfBirth ? errors.dateOfBirth : null
                      }
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      label="Last Name"
                      name="lastName"
                      required
                      value={values.lastName}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={touched.lastName && Boolean(errors.lastName)}
                      helperText={touched.lastName ? errors.lastName : null}
                    />
                    <SelectControl
                      name="sex"
                      label="Gender"
                      required
                      value={values.sex}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      options={['Male', 'Female'].map((option) => ({
                        key: option,
                        value: option,
                        label: option,
                      }))}
                      error={touched.sex && Boolean(errors.sex)}
                      helperText={touched.sex ? errors.sex : null}
                    ></SelectControl>
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item xs={12}>
                    <TextField
                      label="Phone Number"
                      name="phoneNumber"
                      required
                      value={values.phoneNumber}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={touched.phoneNumber && Boolean(errors.phoneNumber)}
                      helperText={
                        touched.phoneNumber ? errors.phoneNumber : null
                      }
                    />
                    <TextField
                      label="Email Address"
                      name="emailAddress"
                      value={values.emailAddress}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={
                        touched.emailAddress && Boolean(errors.emailAddress)
                      }
                      helperText={
                        touched.emailAddress ? errors.emailAddress : null
                      }
                    />
                    <TextField
                      label="Address"
                      required
                      name="address"
                      value={values.address}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={touched.address && Boolean(errors.address)}
                      helperText={touched.address ? errors.address : null}
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={10}>
                  <Grid item xs={6}>
                    <SelectControl
                      name="parish"
                      label="Parish"
                      required
                      value={values.parish}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      options={
                        parishes
                          ? parishes.map((parish) => ({
                              key: parish._id,
                              value: parish._id,
                              label: parish.name,
                            }))
                          : []
                      }
                      error={touched.parish && Boolean(errors.parish)}
                      helperText={touched.parish ? errors.parish : null}
                    ></SelectControl>
                  </Grid>
                  <Grid item xs={6}>
                    <Autocomplete
                      name="radaExtension"
                      required
                      inputValue={
                        values.radaExtension & (radaExtensions.length > 0)
                          ? radaExtensions.find(
                              (e) => e._id === values.radaExtension,
                            ).name
                          : ''
                      }
                      onChange={(e, value) =>
                        setFieldValue('radaExtension', value ? value._id : '')
                      }
                      options={radaExtensions}
                      getOptionLabel={(option) => option.name || ''}
                      getOptionSelected={(option, value) =>
                        option._id === values.radaExtension
                      }
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Rada Extension"
                          error={
                            touched.radaExtension &&
                            Boolean(errors.radaExtension)
                          }
                          helperText={
                            touched.radaExtension ? errors.radaExtension : null
                          }
                        />
                      )}
                    ></Autocomplete>
                  </Grid>
                </Grid>
                <div>
                  <CheckboxGroupControl
                    name="crops"
                    values={values.crops}
                    onChange={handleChange}
                    columns={3}
                    options={crops.map((crop) => ({
                      value: crop._id,
                      label: crop.name,
                    }))}
                    error={touched.crops && Boolean(errors.crops)}
                    helperText={touched.crops ? errors.crops : null}
                  />
                </div>
              </Card>
              <div
                style={{
                  marginTop: '16px',
                  display: 'flex',
                  justifyContent: 'flex-end',
                }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  onClick={(e) => handleSubmit()}
                >
                  Submit
                </Button>
              </div>
            </form>
          )}
        </Formik>
      </Grid>
    </Grid>
  ) : (
    ''
  );
}
