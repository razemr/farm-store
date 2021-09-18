import { Grid, TextField, Button, IconButton } from '@material-ui/core';
import { Delete, Assignment } from '@material-ui/icons';
import { Formik, FieldArray } from 'formik';
import { SelectControl } from '../FormControls/SelectControl';
import { DatePickerControl } from '../FormControls/DatePickerControl';
import { MilestoneForm } from '../MilestoneForm';
import { validationSchema } from './validationSchema';
import { Card } from '../Card';
import { makeStyles } from '@material-ui/core';
import { useContext } from 'react';
import { GlobalContext } from '../../context/GlobalState';

const useStyles = makeStyles({
  form: {
    '& .MuiFormControl-root': {
      width: '100%',
      marginBottom: '16px !important',
    },
  },
  milestoneForm: {
    width: '100%',
    position: 'relative',
  },
  close: {
    position: 'absolute',
    top: '10px',
    right: '10px',
  },
});

export default function ProgramForm(props) {
  const { onSubmit, program } = props;
  const classes = useStyles();
  const { farmers, crops, parishes, radaExtensions } =
    useContext(GlobalContext);

  return (
    <Grid container>
      <Grid item xs={2}></Grid>
      <Grid item xs={8}>
        {program ? (
          <Formik
            enableReinitialize={true}
            initialValues={program}
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
            }) => (
              <form className={classes.form}>
                <Card
                  header="Details"
                  label={<Assignment fontSize="large" />}
                  color="primary"
                >
                  <Grid container spacing={9}>
                    <Grid item xs={6}>
                      <TextField
                        label="Program Name"
                        name="name"
                        value={values.name}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        error={touched.name && Boolean(errors.name)}
                        helperText={touched.name ? errors.name : null}
                      />
                      <SelectControl
                        name="crop"
                        label="Crop"
                        value={values.crop}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        options={
                          crops
                            ? crops.map(({ _id, name }) => ({
                                key: _id,
                                value: _id,
                                label: name,
                              }))
                            : []
                        }
                        error={touched.crop && Boolean(errors.crop)}
                        helperText={touched.crop ? errors.crop : null}
                      ></SelectControl>
                      <DatePickerControl
                        label="Start Date"
                        name="startDate"
                        value={values.startDate}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        error={touched.startDate && Boolean(errors.startDate)}
                        helperText={touched.startDate ? errors.startDate : null}
                      />
                      <SelectControl
                        name="parish"
                        label="Parish"
                        value={values.parish}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        options={
                          parishes
                            ? parishes.map(({ _id, name }) => ({
                                key: _id,
                                value: _id,
                                label: name,
                              }))
                            : []
                        }
                        error={touched.parish && Boolean(errors.parish)}
                        helperText={touched.parish ? errors.parish : null}
                      ></SelectControl>
                    </Grid>
                    <Grid item xs={6}>
                      <SelectControl
                        name="farmer"
                        label="Farmer"
                        value={values.farmer}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        options={
                          farmers
                            ? farmers.map(({ _id, firstName, lastName }) => ({
                                key: _id,
                                value: _id,
                                label: `${firstName} ${lastName}`,
                              }))
                            : []
                        }
                        error={touched.farmer && Boolean(errors.farmer)}
                        helperText={touched.farmer ? errors.farmer : null}
                      ></SelectControl>
                      <TextField
                        type="number"
                        label="Acres"
                        name="acres"
                        value={values.acres}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        inputProps={{ step: 'any', min: '0' }}
                        error={touched.acres && Boolean(errors.acres)}
                        helperText={touched.acres ? errors.acres : null}
                      />
                      <DatePickerControl
                        label="End Date"
                        name="endDate"
                        value={values.endDate}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        error={touched.endDate && Boolean(errors.endDate)}
                        helperText={touched.endDate ? errors.endDate : null}
                      />
                      <SelectControl
                        name="radaExtension"
                        label="RADA Extension"
                        value={values.radaExtension}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        options={
                          radaExtensions
                            ? radaExtensions.map(({ _id, name }) => ({
                                key: _id,
                                value: _id,
                                label: name,
                              }))
                            : []
                        }
                        error={
                          touched.radaExtension && Boolean(errors.radaExtension)
                        }
                        helperText={
                          touched.radaExtension ? errors.radaExtension : null
                        }
                      ></SelectControl>
                    </Grid>
                  </Grid>
                  <Grid container>
                    <Grid item xs={12}>
                      <TextField
                        label="Description"
                        name="description"
                        multiline
                        value={values.description}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        error={
                          touched.description && Boolean(errors.description)
                        }
                        helperText={
                          touched.description ? errors.description : null
                        }
                      />
                    </Grid>
                  </Grid>
                </Card>

                <FieldArray
                  name="milestones"
                  render={(arrayHelpers) => (
                    <div>
                      {(values.milestones && values.milestones.length) > 0 &&
                        values.milestones.map((m, index) => (
                          <MilestoneForm
                            key={index}
                            index={index}
                            actions={
                              index !== 0 && (
                                <IconButton
                                  className={classes.close}
                                  onClick={(e) => arrayHelpers.remove(index)}
                                >
                                  <Delete />
                                </IconButton>
                              )
                            }
                            productApplications={
                              values.milestones[index].productApplications
                            }
                            date={values.milestones[index].date}
                            name={`milestones.${index}`}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            errors={
                              errors && errors.milestones
                                ? errors.milestones[index]
                                : {}
                            }
                            touched={
                              touched && touched.milestones
                                ? touched.milestones[index]
                                : {}
                            }
                          />
                        ))}
                      <Button
                        style={{ marginTop: '20px' }}
                        onClick={() =>
                          arrayHelpers.push({
                            date: null,
                            productApplications: [
                              {
                                product: '',
                                quantity: '',
                                unit: '',
                              },
                            ],
                          })
                        }
                      >
                        Add Milestone
                      </Button>
                    </div>
                  )}
                />

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
        ) : (
          ''
        )}
      </Grid>
      <Grid item xs={2}></Grid>
    </Grid>
  );
}
