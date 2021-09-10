import { useState, useContext, useEffect } from 'react';
import {
  Stepper,
  Step,
  StepLabel,
  makeStyles,
  Button,
  TextField,
} from '@material-ui/core';
import { SelectControl } from '../FormControls/SelectControl';
import { DatePickerControl } from '../FormControls/DatePickerControl';
import { RadioControl } from '../FormControls/RadioControl';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { loadMilestonesFromTemplate } from '../../utils/loadMilestonesFromTemplate';
import { GlobalContext } from '../../context/GlobalState';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  form: {
    minHeight: '280px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    padding: '0 20px 24px 24px',
    '& .MuiFormControl-root': {
      width: '70%',
      marginBottom: '20px',
    },
    '& h3': {
      marginBottom: '20px',
    },
  },
  number: {
    width: '70%',
    marginBottom: '20px',
  },
  actions: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  backButton: {
    marginRight: '20px',
  },
}));

function getSteps() {
  return ['Input Option', 'Template Details', 'Additional Information'];
}

const initialValues = {
  template: '',
  startDate: null,
  acres: '',
  farmer: '',
  name: '',
};

export default function ProgramStepper(props) {
  const { onManual, onTemplate } = props;
  const { listItems, farmers, programTemplates } = useContext(GlobalContext);
  const [activeStep, setActiveStep] = useState(0);
  const [inputOption, setInputOption] = useState('0');
  const classes = useStyles();
  const steps = getSteps();

  useEffect(() => {
    listItems(['farmers', 'programTemplates']);
  }, []);

  const validationSchema = Yup.object({
    template: Yup.string().required('Template is required'),
    startDate: Yup.date()
      .nullable()
      .typeError('Invalid Date')
      .required('Start date is required'),
    acres: Yup.number().moreThan(0).required('Number of acres is required'),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
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

      onTemplate({
        farmer: values.farmer,
        template: values.template,
        name: values.name || template.name,
        crop: template.crop,
        acres,
        endDate,
        milestones,
        startDate,
      });
    },
  });

  const handleNext = async () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel
              error={index === 1 && Object.keys(formik.errors).length > 0}
            >
              {label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
      <form className={classes.form}>
        {activeStep === 0 ? (
          <>
            <h3>Input Option</h3>
            <RadioControl
              value={inputOption}
              onChange={(e) => setInputOption(e.target.value)}
              options={[
                { key: '0', label: 'Template', value: '0' },
                { key: '1', label: 'Manual', value: '1' },
              ]}
            />
          </>
        ) : activeStep === 1 ? (
          <>
            <h3>Template Details</h3>
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
          </>
        ) : (
          <>
            <h3>Additional Information</h3>
            <TextField
              label="Program Name"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />

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
            ></SelectControl>
          </>
        )}
      </form>

      <div className={classes.actions}>
        <Button
          disabled={activeStep === 0}
          onClick={handleBack}
          className={classes.backButton}
        >
          Back
        </Button>
        {inputOption === '1' ? (
          <Button variant="contained" color="primary" onClick={onManual}>
            Confirm
          </Button>
        ) : activeStep < steps.length - 1 ? (
          <Button variant="contained" color="primary" onClick={handleNext}>
            Next
          </Button>
        ) : (
          <Button
            variant="contained"
            color="primary"
            onClick={() => formik.submitForm()}
          >
            Confirm
          </Button>
        )}
      </div>
    </div>
  );
}
