import {
  Stepper,
  Step,
  StepLabel,
  makeStyles,
  Button,
  TextField,
} from "@material-ui/core";
import { useState } from "react";
import { SelectControl, DatePickerControl } from "..";
import RadioControl from "../form-controls/radio/RadioControl";
import { useFormik } from "formik";
import * as Yup from "yup";
import { loadMilestonesFromTemplate } from "../../services/program";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  form: {
    minHeight: "280px",
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
    padding: "0 20px 24px 24px",
    "& .MuiFormControl-root": {
      width: "70%",
      marginBottom: "20px",
    },
    "& h3": {
      marginBottom: "20px",
    },
  },
  number: {
    width: "70%",
    marginBottom: "20px",
  },
  actions: {
    display: "flex",
    justifyContent: "flex-end",
  },
  backButton: {
    marginRight: "20px",
  },
}));

function getSteps() {
  return ["Input Option", "Template Details", "Additional Information"];
}

const initialValues = {
  farmer: "",
  startDate: null,
  acres: "",
  template: "",
};

const template = {
  id: "1",
  crop: "1",
  company: "1",
  name: "Pineapple - PNMS",
  milestones: [{
    daysFromStart: 0,
    productApplications: [
      {
        product: "1",
        quantity: 5,
        unit: "lb"
      }
    ]
  },{
    daysFromStart: 10,
    productApplications: [
      {
        product: "1",
        quantity: 7,
        unit: "lb"
      },
      {
        product: "2",
        quantity: 5,
        unit: "pack"
      }
    ]
  },{
    daysFromStart: 30,
    productApplications: [
      {
        product: "3",
        quantity: 12,
        unit: "lb"
      },{
        product: "1",
        quantity: 5,
        unit: "lb"
      },{
        product: "2",
        quantity: 59,
        unit: "l"
      }
    ]
  }],
};

export default function ProgramStepper(props) {
  const { onManual, onTemplate } = props;
  const [activeStep, setActiveStep] = useState(0);
  const [inputOption, setInputOption] = useState("0");
  const classes = useStyles();
  const steps = getSteps();
  const validationSchema = Yup.object({});
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      const startDate = new Date(values.startDate);
      const acres = Number(values.acres);
      const milestones = loadMilestonesFromTemplate(
        template.milestones,
        startDate,
        acres
      );

      onTemplate({
        milestones,
        startDate,
        crop: template.crop,
        farmer: values.farmer,
        company: template.company,
        name: values.name || template.name,
        template: template.id,
        acres
      });
    },
  });

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <form className={classes.form}>
        {activeStep === 0 ? (
          <>
            <h3>Input Option</h3>
            <RadioControl
              value={inputOption}
              options={[
                {
                  label: "Template",
                  value: "0",
                },
                {
                  label: "Manual",
                  value: "1",
                },
              ]}
              onChange={(e) => setInputOption(e.target.value)}
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
              options={[
                {
                  key: "1",
                  label: "Pineapple - PNMS",
                  value: "1",
                },
                {
                  key: "2",
                  label: "Dasheen - PNMS",
                  value: "2",
                },
                {
                  key: "3",
                  label: "Carrot - PNMS",
                  value: "3",
                },
              ]}
            />
            <DatePickerControl
              label="Start Date"
              name="startDate"
              value={formik.values.startDate}
              onChange={formik.handleChange}
            />
            <TextField
              type="number"
              label="Acres"
              name="acres"
              value={formik.values.acres}
              onChange={formik.handleChange}
              inputProps={{ step: "any", min: "0" }}
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
            />

            <SelectControl
              name="farmer"
              label="Farmer"
              value={formik.values.farmer}
              onChange={formik.handleChange}
              options={[
                {
                  key: "1",
                  label: "Ramone Graham",
                  value: "1",
                },
                {
                  key: "2",
                  label: "Sheree Bryan",
                  value: "2",
                },
              ]}
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
        {inputOption === "1" ? (
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
