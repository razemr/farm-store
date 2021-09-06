import { useState, useEffect } from "react";
import { Paper, Grid, makeStyles, TextField, Button } from "@material-ui/core";
import { Formik, FieldArray } from "formik";
import * as Yup from "yup";
import { SelectControl, DatePickerControl } from "../index";
import MilestoneForm from "../milestone-form/MilestoneForm";
import ProductDialog from "../product-dialog/ProductDialog";

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
});

const initialValues = {
  name: "",
  farmer: "",
  startDate: null,
  endDate: null,
  acres: "",
  crop: "",
  milestones: [],
};

export default function ProgramForm() {
  const classes = useStyles();
  const validationSchema = Yup.object({});
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
    <>
      <ProductDialog />
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(value) => {}}
        render={({ values, handleChange }) => (
          <Paper className={classes.paper}>
            <form className={classes.form}>
              <Grid container>
                <Grid item xs={6}>
                  <TextField
                    label="Program Name"
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                  />
                  <SelectControl
                    name="crop"
                    label="Crop"
                    value={values.crop}
                    onChange={handleChange}
                    options={crops}
                  ></SelectControl>
                  <DatePickerControl
                    label="Start Date"
                    name="startDate"
                    value={values.startDate}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={6}>
                  <SelectControl
                    name="farmer"
                    label="Farmer"
                    value={values.farmer}
                    onChange={handleChange}
                    options={farmers}
                  ></SelectControl>
                  <TextField
                    type="number"
                    label="Acres"
                    name="acres"
                    value={values.acres}
                    onChange={handleChange}
                  />
                  <DatePickerControl
                    label="End Date"
                    name="endDate"
                    value={values.endDate}
                    onChange={handleChange}
                  />
                </Grid>
              </Grid>
              <h3 style={{ marginBottom: "20px" }}>Milestones</h3>
              <FieldArray
                name="milestones"
                render={(arrayHelpers) => (
                  <div>
                    {values.milestones.length > 0 &&
                      values.milestones.map((m, i) => (
                        <MilestoneForm
                          key={i}
                          productApplications={
                            values.milestones[i].productApplications
                          }
                          date={values.milestones[i].date}
                          index={i}
                          onChange={handleChange}
                        />
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
            </form>
          </Paper>
        )}
      />
    </>
  );
}
