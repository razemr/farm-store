import {
  Dialog,
  DialogContent,
  Typography,
  Paper,
  Button,
  TextField,
  Grid,
} from '@material-ui/core';
import { SelectControl } from '../FormControls/SelectControl';
import { DatePickerControl } from '../FormControls/DatePickerControl';
import { makeStyles } from '@material-ui/core';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { loadMilestonesFromTemplate } from '../../utils/loadMilestonesFromTemplate';
import { GlobalContext } from '../../context/GlobalState';
import { useContext, useEffect } from 'react';
import './ProgramDialog.css';

const useStyles = (props) =>
  makeStyles((theme) => ({
    paperRoot: {
      background: theme.customBackgrounds[`${props.color}`],
      boxShadow: theme.customShadows[`${props.color}`],
    },
    stepperRoot: {
      background: 'rgb(0 0 0 / 0)',
      border: 'none',
      boxShadow: 'none',
    },
    dialogRoot: {
      overflowY: 'visible',
    },
    dialogPaper: {
      overflowY: 'visible',
    },
    dialogContentRoot: {
      overflowY: 'visible',
    },
  }));

export default function ProgramDialog(props) {
  const { open, onClose, color } = props;
  const { listItems, farmers, programTemplates } = useContext(GlobalContext);
  const classes = useStyles({ color: color || 'primary' })();

  useEffect(() => {
    listItems(['farmers', 'programTemplates']);
  }, []);

  const formik = useFormik({
    initialValues: {
      template: '',
      startDate: null,
      acres: '',
      name: '',
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
      const { milestones, endDate } = loadMilestonesFromTemplate(
        template.milestones,
        startDate,
        acres,
      );

      onClose({
        template: values.template,
        farmer: values.farmer,
        name: template.name,
        crop: template.crop,
        acres,
        endDate,
        milestones,
        startDate,
      });
    },
  });

  return (
    <Dialog
      open={open}
      classes={{ root: classes.dialogRoot, paper: classes.dialogPaper }}
    >
      <DialogContent
        classes={{ root: classes.dialogContentRoot }}
        className="dialog-content"
      >
        <Paper classes={{ root: classes.paperRoot }} className="dialog-header">
          <Typography variant="h1">Template Selection</Typography>
        </Paper>

        <form>
          <Grid container>
          <Grid xs={12}>
            <SelectControl
              name="template"
              value={formik.values.template}
              label="Template"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.template && Boolean(formik.errors.template)}
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
              name="farmer"
              label="Farmer"
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
              error={
                formik.touched.farmer && Boolean(formik.errors.farmer)
              }
              helperText={
                formik.touched.farmer ? formik.errors.farmer : null
              }
            ></SelectControl>
          <Grid xs={12}>
            <DatePickerControl
              label="Start Date"
              name="startDate"
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
          <Grid xs={12}>
            <TextField
              type="number"
              label="Acres"
              name="acres"
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

        <div className="dialog-actions">
          <Button onClick={(e) => onClose()}>Manual</Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => formik.submitForm()}
          >
            Confirm
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
