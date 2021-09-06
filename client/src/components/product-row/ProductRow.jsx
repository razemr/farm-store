import { Grid, TextField } from "@material-ui/core";
import { SelectControl } from "../index";

const products = [
  {
    key: "1",
    label: "15-5-35",
    value: "1",
  },
  {
    key: "2",
    label: "Diuron",
    value: "2",
  },
  {
    key: "3",
    label: "15-28-28 - CalciFersan",
    value: "3",
  },
];

const units = [
  {
    key: "1",
    label: "lb",
    value: "lb",
  },
  {
    key: "2",
    label: "kg",
    value: "kg",
  },
  {
    key: "3",
    label: "pack",
    value: "pack",
  },
  {
    key: "4",
    label: "l",
    value: "l",
  },
  {
    key: "5",
    label: "gal",
    value: "gal",
  },
];

export default function ProductRow(props) {
  const { onChange, onBlur, product, quantity, unit, name, errors, touched } =
    props;

  return (
    <Grid container>
      <Grid item xs={4}>
        <SelectControl
          name={`${name}.product`}
          label="Product"
          options={products}
          value={product}
          onChange={onChange}
          onBlur={onBlur}
          error={
            touched && touched.product && errors && errors.product
              ? true
              : false
          }
          helperText={
            touched && touched.product && errors ? errors.product : null
          }
        />
      </Grid>
      <Grid item xs={4}>
        <TextField
          name={`${name}.quantity`}
          type="number"
          label="Quantity"
          value={quantity}
          onChange={onChange}
          onBlur={onBlur}
          inputProps={{ step: "any", min: "0" }}
          error={
            touched && touched.quantity && errors && errors.quantity
              ? true
              : false
          }
          helperText={
            touched && touched.quantity && errors ? errors.quantity : null
          }
        />
      </Grid>
      <Grid item xs={4}>
        <SelectControl
          name={`${name}.unit`}
          label="Unit"
          options={units}
          value={unit}
          onChange={onChange}
          onBlur={onBlur}
          error={
            touched && touched.unit && errors && errors.unit ? true : false
          }
          helperText={touched && touched.unit && errors ? errors.unit : null}
        />
      </Grid>
    </Grid>
  );
}
