import { Grid, TextField } from '@material-ui/core';
import { SelectControl } from '../FormControls/SelectControl';

export default function ProductRow(props) {
  const {
    onChange,
    onBlur,
    product,
    quantity,
    unit,
    name,
    errors,
    touched,
    units,
    products,
  } = props;

  return (
    <Grid container>
      <Grid item xs={4}>
        <SelectControl
          name={`${name}.product`}
          label="Product"
          options={
            products
              ? products.map(({ _id, name }) => ({
                  key: _id,
                  value: _id,
                  label: name,
                }))
              : []
          }
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
          inputProps={{ step: 'any', min: '0' }}
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
          options={
            units
              ? units.map(({ _id, name }) => ({
                  key: _id,
                  value: _id,
                  label: name,
                }))
              : []
          }
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
