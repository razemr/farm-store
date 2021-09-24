import { FieldArray, Formik } from 'formik';
import {
  Grid,
  TextField,
  Button,
  makeStyles,
  IconButton,
} from '@material-ui/core';
import { validationSchema } from './validationSchema';
import { FileCopy, Timeline, Delete, Add, Close } from '@material-ui/icons';
import { Card } from '../Card';
import { SelectControl } from '../FormControls/SelectControl';
import { useContext } from 'react';
import { GlobalContext } from '../../context/GlobalState';

const useStyles = makeStyles({
  form: {
    '& .MuiFormControl-root': {
      width: '100%',
      marginBottom: '16px !important',
    },
  },
  close: {
    position: 'absolute',
    top: '10px',
    right: '10px',
  },
});

export default function TemplateForm(props) {
  const { template, onSubmit, title } = props;
  const classes = useStyles();
  const { crops, companies, products, units } = useContext(GlobalContext);

  const getMilestoneErrors = (errors, index) => {
    return errors.milestoneTemplates && errors.milestoneTemplates[index]
      ? errors.milestoneTemplates[index]
      : {};
  };

  const getMilestoneTouched = (touched, index) => {
    return touched.milestoneTemplates && touched.milestoneTemplates[index]
      ? touched.milestoneTemplates[index]
      : {};
  };

  const getApplicationErrors = (errors, index, i) => {
    const _errors = getMilestoneErrors(errors, index);
    return _errors.productApplications && _errors.productApplications[i]
      ? _errors.productApplications[i]
      : {};
  };

  const getApplicationTouched = (touched, index, i) => {
    const _touched = getMilestoneTouched(touched, index);
    return _touched.productApplications && _touched.productApplications[i]
      ? _touched.productApplications[i]
      : {};
  };

  return template ? (
    <Grid container justifyContent="center">
      <Grid item xs={8}>
        <Formik
          enableReinitialize={true}
          initialValues={template}
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
                header={title}
                label={<FileCopy fontSize="large" />}
                color="primary"
              >
                <Grid container spacing={10}>
                  <Grid item xs={12}>
                    <TextField
                      label="Name"
                      name="name"
                      required
                      value={values.name}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={touched.name && Boolean(errors.name)}
                      helperText={touched.name ? errors.name : null}
                    />
                    <SelectControl
                      name="crop"
                      label="Crop"
                      required
                      value={values.crop}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      options={crops.map((crop) => ({
                        key: crop._id,
                        value: crop._id,
                        label: crop.name,
                      }))}
                      error={touched.crop && Boolean(errors.crop)}
                      helperText={touched.crop ? errors.crop : null}
                    ></SelectControl>
                    <TextField
                      label="Description"
                      name="description"
                      multiline
                      required
                      value={values.description}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={touched.description && Boolean(errors.description)}
                      helperText={
                        touched.description ? errors.description : null
                      }
                    />
                    <SelectControl
                      name="company"
                      label="Company"
                      required
                      value={values.company}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      options={companies.map((company) => ({
                        key: company._id,
                        value: company._id,
                        label: company.name,
                      }))}
                      error={touched.company && Boolean(errors.company)}
                      helperText={touched.company ? errors.company : null}
                    ></SelectControl>
                  </Grid>
                </Grid>
              </Card>

              <FieldArray
                name="milestoneTemplates"
                render={(arrayHelpers) => (
                  <>
                    {values.milestoneTemplates.length > 0
                      ? values.milestoneTemplates.map((template, index) => (
                          <Card
                            key={index}
                            style={{ marginTop: '32px' }}
                            header={`Milestone ${index + 1}`}
                            label={<Timeline fontSize="large" />}
                            color="primary"
                          >
                            <IconButton
                              style={{
                                display: index != 0 ? 'inherit' : 'none',
                              }}
                              className={classes.close}
                              onClick={(e) => arrayHelpers.remove(index)}
                            >
                              <Delete />
                            </IconButton>

                            <Grid
                              container
                              spacing={3}
                              justifyContent="space-between"
                            >
                              <Grid item xs={4}>
                                <TextField
                                  name={`milestoneTemplates.${index}.daysFromStart`}
                                  type="number"
                                  label="Days from Start"
                                  required
                                  value={
                                    values.milestoneTemplates[index]
                                      .daysFromStart
                                  }
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  inputProps={{ step: 'any', min: '0' }}
                                  error={
                                    getMilestoneTouched(touched, index)
                                      .daysFromStart &&
                                    getMilestoneErrors(errors, index)
                                      .daysFromStart
                                      ? true
                                      : false
                                  }
                                  helperText={
                                    getMilestoneTouched(touched, index)
                                      .daysFromStart
                                      ? getMilestoneErrors(errors, index)
                                          .daysFromStart
                                      : null
                                  }
                                />
                              </Grid>
                            </Grid>

                            <FieldArray
                              name={`milestoneTemplates.${index}.productApplications`}
                              render={(applicationHelpers) => (
                                <>
                                  {values.milestoneTemplates &&
                                  values.milestoneTemplates[index] &&
                                  values.milestoneTemplates[index]
                                    .productApplications &&
                                  values.milestoneTemplates[index]
                                    .productApplications
                                    ? values.milestoneTemplates[
                                        index
                                      ].productApplications.map(
                                        (application, i) => (
                                          <Grid
                                            key={i}
                                            container
                                          >
                                            <Grid item xs={11}>
                                              <Grid
                                                container
                                                spacing={3}
                                              >
                                                <>
                                                  <Grid item xs={4}>
                                                    <SelectControl
                                                      name={`milestoneTemplates.${index}.productApplications.${i}.product`}
                                                      label="Product"
                                                      required
                                                      options={
                                                        products
                                                          ? products.map(
                                                              ({
                                                                _id,
                                                                name,
                                                              }) => ({
                                                                key: _id,
                                                                value: _id,
                                                                label: name,
                                                              }),
                                                            )
                                                          : []
                                                      }
                                                      value={
                                                        values
                                                          .milestoneTemplates[
                                                          index
                                                        ].productApplications[i]
                                                          .product
                                                      }
                                                      onChange={handleChange}
                                                      onBlur={handleBlur}
                                                      error={
                                                        getApplicationTouched(
                                                          touched,
                                                          index,
                                                          i,
                                                        ).product &&
                                                        getApplicationErrors(
                                                          errors,
                                                          index,
                                                          i,
                                                        ).product
                                                          ? true
                                                          : false
                                                      }
                                                      helperText={
                                                        getApplicationTouched(
                                                          touched,
                                                          index,
                                                          i,
                                                        ).product
                                                          ? getApplicationErrors(
                                                              errors,
                                                              index,
                                                              i,
                                                            ).product
                                                          : null
                                                      }
                                                    />
                                                  </Grid>
                                                  <Grid item xs={4}>
                                                    <TextField
                                                      name={`milestoneTemplates.${index}.productApplications.${i}.quantity`}
                                                      type="number"
                                                      label="Quantity"
                                                      required
                                                      value={
                                                        values
                                                          .milestoneTemplates[
                                                          index
                                                        ].productApplications[i]
                                                          .quantity
                                                      }
                                                      onChange={handleChange}
                                                      onBlur={handleBlur}
                                                      inputProps={{
                                                        step: 'any',
                                                        min: '0',
                                                      }}
                                                      error={
                                                        getApplicationTouched(
                                                          touched,
                                                          index,
                                                          i,
                                                        ).quantity &&
                                                        getApplicationErrors(
                                                          errors,
                                                          index,
                                                          i,
                                                        ).quantity
                                                          ? true
                                                          : false
                                                      }
                                                      helperText={
                                                        getApplicationTouched(
                                                          touched,
                                                          index,
                                                          i,
                                                        ).quantity
                                                          ? getApplicationErrors(
                                                              errors,
                                                              index,
                                                              i,
                                                            ).quantity
                                                          : null
                                                      }
                                                    />
                                                  </Grid>
                                                  <Grid item xs={4}>
                                                    <SelectControl
                                                      name={`milestoneTemplates.${index}.productApplications.${i}.unit`}
                                                      label="Unit"
                                                      required
                                                      options={
                                                        units
                                                          ? units.map(
                                                              ({
                                                                _id,
                                                                name,
                                                              }) => ({
                                                                key: _id,
                                                                value: _id,
                                                                label: name,
                                                              }),
                                                            )
                                                          : []
                                                      }
                                                      value={
                                                        values
                                                          .milestoneTemplates[
                                                          index
                                                        ].productApplications[i]
                                                          .unit
                                                      }
                                                      onChange={handleChange}
                                                      onBlur={handleBlur}
                                                      error={
                                                        getApplicationTouched(
                                                          touched,
                                                          index,
                                                          i,
                                                        ).unit &&
                                                        getApplicationErrors(
                                                          errors,
                                                          index,
                                                          i,
                                                        ).unit
                                                          ? true
                                                          : false
                                                      }
                                                      helperText={
                                                        getApplicationTouched(
                                                          touched,
                                                          index,
                                                          i,
                                                        ).unit
                                                          ? getApplicationErrors(
                                                              errors,
                                                              index,
                                                              i,
                                                            ).unit
                                                          : null
                                                      }
                                                    />
                                                  </Grid>
                                                </>
                                              </Grid>
                                            </Grid>

                                            <Grid item xs={1}>
                                              <IconButton
                                                style={{
                                                  visibility:
                                                    i === 0 && 'hidden',
                                                }}
                                                onClick={(e) =>
                                                  applicationHelpers.remove(i)
                                                }
                                              >
                                                <Close />
                                              </IconButton>
                                            </Grid>
                                          </Grid>
                                        ),
                                      )
                                    : ''}
                                  <IconButton
                                    onClick={(e) =>
                                      applicationHelpers.push({
                                        product: '',
                                        quantity: '',
                                        unit: '',
                                      })
                                    }
                                  >
                                    <Add />
                                  </IconButton>
                                </>
                              )}
                            />
                          </Card>
                        ))
                      : ''}
                    <Button
                      style={{ marginTop: '20px' }}
                      onClick={() => {
                        arrayHelpers.push({
                          daysFromStart: '',
                          productApplications: [
                            {
                              product: '',
                              quantity: '',
                              unit: '',
                            },
                          ],
                        });
                      }}
                    >
                      Add Milestone
                    </Button>
                  </>
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
      </Grid>
    </Grid>
  ) : (
    ''
  );
}
