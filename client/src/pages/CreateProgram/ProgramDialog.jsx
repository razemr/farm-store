import { Button, TextField, Grid } from '@material-ui/core';
import { SelectControl } from '../../components/FormControls/SelectControl';
import { DatePickerControl } from '../../components/FormControls/DatePickerControl';
import { makeStyles } from '@material-ui/core';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { loadMilestonesFromTemplate } from '../../utils/loadMilestonesFromTemplate';
import { GlobalContext } from '../../context/GlobalState';
import { useContext } from 'react';
import { Dialog } from '../../components/Dialog';

const useStyles = (props) =>
  makeStyles((theme) => ({
    stepperRoot: {
      background: 'rgb(0 0 0 / 0)',
      border: 'none',
      boxShadow: 'none',
    },
    formControlRoot: {
      width: '100%',
      marginBottom: '24px !important',
    },
  }));

export default function ProgramDialog(props) {
  const { open, onClose, color } = props;
  const { farmers, programTemplates } = useContext(GlobalContext);
  const classes = useStyles({ color: color || 'primary' })();

  const formik = useFormik({
    initialValues: {
      template: '',
      startDate: null,
      acres: '',
      name: '',
      farmer: '',
    },
    validationSchema: Yup.object({
      template: Yup.string().required('Template is required'),
      farmer: Yup.string().required('Farmer is required'),
      startDate: Yup.date()
        .nullable()
        .typeError('Invalid Date')
        .required('Start date is required'),
      acres: Yup.number().moreThan(0).required('Number of acres is required'),
    }),
    onSubmit: (values) => {
      const startDate = new Date(values.startDate);
      const acres = Number(values.acres);
      const template = programTemplates.find(
        (template) => template._id === values.template,
      );
      const farmer = farmers.find((farmer) => farmer._id === values.farmer);
      const { milestones, endDate } = loadMilestonesFromTemplate(
        template.milestones,
        startDate,
        acres,
      );

      onClose({
        template: values.template,
        farmer: values.farmer,
        parish: farmer.parish,
        radaExtension: farmer.radaExtension,
        name: template.name,
        crop: template.crop,
        description: template.description,
        acres,
        endDate,
        milestones,
        startDate,
      });
    },
  });

  return (
    <Dialog
      title="Template Selection"
      open={open}
      content={
        <form>
          <Grid container>
            <Grid item xs={12}>
              <SelectControl
                classes={{ root: classes.formControlRoot }}
                name="template"
                required
                value={formik.values.template}
                label="Template"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.template && Boolean(formik.errors.template)
                }
                helperText={
                  formik.touched.template ? formik.errors.template : null
                }
                options={
                  programTemplates
                    ? programTemplates.map(({ _id, name }) => ({
                        key: _id,
                        value: _id,
                        label: name,
                      }))
                    : []
                }
              />
            </Grid>
            <SelectControl
              classes={{ root: classes.formControlRoot }}
              name="farmer"
              label="Farmer"
              required
              value={formik.values.farmer}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              options={
                farmers
                  ? farmers.map(({ _id, firstName, lastName }) => ({
                      key: _id,
                      value: _id,
                      label: `${firstName} ${lastName}`,
                    }))
                  : []
              }
              error={formik.touched.farmer && Boolean(formik.errors.farmer)}
              helperText={formik.touched.farmer ? formik.errors.farmer : null}
            ></SelectControl>
            <Grid item xs={12}>
              <DatePickerControl
                classes={{ root: classes.formControlRoot }}
                label="Start Date"
                name="startDate"
                required
                value={formik.values.startDate}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.startDate && Boolean(formik.errors.startDate)
                }
                helperText={
                  formik.touched.startDate ? formik.errors.startDate : null
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                classes={{ root: classes.formControlRoot }}
                type="number"
                label="Acres"
                name="acres"
                required
                inputProps={{ step: 'any', min: '0' }}
                value={formik.values.acres}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.acres && Boolean(formik.errors.acres)}
                helperText={formik.touched.acres ? formik.errors.acres : null}
              />
            </Grid>
          </Grid>
        </form>
      }
      actions={
        <>
          <Button onClick={(e) => onClose()}>Manual</Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => formik.submitForm()}
          >
            Confirm
          </Button>
        </>
      }
    />
  );
}
