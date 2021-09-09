import { Paper, Grid, TextField, Button, IconButton } from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import { Formik, FieldArray } from 'formik';
import { SelectControl } from '../FormControls/SelectControl';
import { DatePickerControl } from '../FormControls/DatePickerControl';
import { MilestoneForm } from '../MilestoneForm';
import { validationSchema } from './validationSchema';
import { useStyles } from './useStyles';

export default function ProgramForm(props) {
  const { program, onSubmit, farmers, crops, units, products } = props;
  const classes = useStyles();

  return (
    <Formik
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
        <Paper className={classes.paper}>
          <form className={classes.form}>
            <Grid container>
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
              </Grid>
            </Grid>
            <h3 style={{ margin: '10px 0' }}>Milestones:</h3>
            <FieldArray
              name="milestones"
              render={(arrayHelpers) => (
                <div>
                  {values.milestones.length > 0 &&
                    values.milestones.map((m, index) => (
                      <div className={classes.milestoneForm} key={index}>
                        {index !== 0 && (
                          <IconButton
                            className={classes.close}
                            onClick={(e) => arrayHelpers.remove(index)}
                          >
                            <Delete />
                          </IconButton>
                        )}

                        <MilestoneForm
                          units={units}
                          products={products}
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
                      </div>
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
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button
                variant="contained"
                color="primary"
                onClick={(e) => handleSubmit()}
              >
                Submit
              </Button>
            </div>
          </form>
        </Paper>
      )}
    </Formik>
  );
}
