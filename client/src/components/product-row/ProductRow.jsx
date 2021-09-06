import { Button, Grid, TextField } from "@material-ui/core";
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
  const { onChange, product, quantity, unit } = props;

  return (
    <Grid container>
      <Grid item xs={4}>
        <SelectControl label="Product" options={products} value={product} onChange={onChange}/>
      </Grid>
      <Grid item xs={4}>
        <TextField type="number" label="Quantity" name="quantity" value={quantity} onChange={onChange}/>
      </Grid>
      <Grid item xs={4}>
        <SelectControl label="Unit" options={units} value={unit} onChange={onChange}/>
      </Grid>
    </Grid>
  );
}
