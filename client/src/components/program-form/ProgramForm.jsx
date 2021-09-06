import {
  Paper,
  Grid,
  makeStyles,
  TextField,
  Button,
  IconButton,
} from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import { Formik, FieldArray } from "formik";
import * as Yup from "yup";
import { SelectControl, DatePickerControl } from "../index";
import MilestoneForm from "../milestone-form/MilestoneForm";

const useStyles = makeStyles({
  paper: {
    margin: "0 20px",
    padding: "20px",
  },
  form: {
    "& .MuiFormControl-root": {
      width: "70%",
      marginBottom: "20px",
    },
  },
  milestoneForm: {
    width: "100%",
    position: "relative",
  },
  close: {
    position: "absolute",
    top: "10px",
    right: "10px",
  },
});

export default function ProgramForm(props) {
  const { program } = props;
  const classes = useStyles();
  const validationSchema = Yup.object({
    name: Yup.string().required("Program name is required"),
    farmer: Yup.string().required("Farmer is required"),
    startDate: Yup.date()
      .nullable()
      .typeError("Invalid Date")
      .required("Start date is required"),
    endDate: Yup.date()
      .nullable()
      .typeError("Invalid Date")
      .min(Yup.ref("startDate"), "End date must be after start date")
      .required("End date is required"),
    acres: Yup.number().moreThan(0).required("Number of acres is required"),
    crop: Yup.string().required("Crop is required"),
    milestones: Yup.array().of(
      Yup.object().shape({
        date: Yup.date()
          .nullable()
          .typeError("Invalid Date")
          .required("Start date is required"),
        productApplications: Yup.array().of(
          Yup.object().shape({
            product: Yup.string().required("Product is required"),
            quantity: Yup.number().moreThan(0).required("Quantity is required"),
            unit: Yup.string().required("Unit is required"),
          })
        ),
      })
    ),
  });
  const farmers = [
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
  ];
  const crops = [
    {
      key: "1",
      label: "Pineapple",
      value: "1",
    },
    {
      key: "2",
      label: "Dasheen",
      value: "2",
    },
    {
      key: "3",
      label: "Carrot",
      value: "3",
    },
  ];

  return (
    <Formik
      initialValues={program}
      validationSchema={validationSchema}
      onSubmit={(value) => {}}
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
                  options={crops}
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
                  options={farmers}
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
                  inputProps={{ step: "any", min: "0" }}
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
            <h3 style={{ margin: "10px 0" }}>Milestones:</h3>
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
                    style={{ marginTop: "20px" }}
                    onClick={() =>
                      arrayHelpers.push({
                        date: null,
                        productApplications: [
                          {
                            product: "",
                            quantity: "",
                            unit: "",
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
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
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
