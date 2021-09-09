import './MilestoneForm.css';
import { Grid, IconButton } from '@material-ui/core';
import { DatePickerControl } from '../FormControls/DatePickerControl';
import { ProductRow } from '../ProductRow';
import { FieldArray } from 'formik';
import { Close, Add } from '@material-ui/icons';
import { useStyles } from './useStyles';

export default function MilestoneForm(props) {
  const {
    date,
    productApplications,
    onChange,
    onBlur,
    name,
    errors,
    touched,
    units,
    products,
  } = props;
  const classes = useStyles();

  return (
    <div className="form-container">
      <Grid container>
        <Grid item xs={4}>
          <DatePickerControl
            label="Application Date"
            name={`${name}.date`}
            value={date}
            onBlur={onBlur}
            onChange={onChange}
            error={
              touched && errors && touched.date && errors.date ? true : false
            }
            helperText={touched && errors && touched.date ? errors.date : null}
          />
        </Grid>
      </Grid>
      <FieldArray
        name={`${name}.productApplications`}
        render={(arrayHelpers) => (
          <div>
            {productApplications.length > 0 &&
              productApplications.map((p, index) => (
                <div className={classes.productRow} key={index}>
                  <ProductRow
                    units={units}
                    products={products}
                    product={p.product}
                    quantity={p.quantity}
                    unit={p.unit}
                    onChange={onChange}
                    onBlur={onBlur}
                    name={`${name}.productApplications.${index}`}
                    errors={
                      errors && errors.productApplications
                        ? errors.productApplications[index]
                        : {}
                    }
                    touched={
                      touched && touched.productApplications
                        ? touched.productApplications[index]
                        : {}
                    }
                  />
                  <IconButton
                    style={{ visibility: index === 0 && 'hidden' }}
                    onClick={(e) => arrayHelpers.remove(index)}
                  >
                    <Close />
                  </IconButton>
                </div>
              ))}
            <IconButton
              onClick={(e) =>
                arrayHelpers.push({
                  product: '',
                  quantity: '',
                  unit: '',
                })
              }
            >
              <Add />
            </IconButton>
          </div>
        )}
      />
    </div>
  );
}
