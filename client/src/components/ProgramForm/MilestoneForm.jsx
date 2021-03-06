import './MilestoneForm.css';
import { Grid, IconButton } from '@material-ui/core';
import { DatePickerControl } from '../FormControls/DatePickerControl';
import ProductRow from './ProductRow';
import { FieldArray } from 'formik';
import { Close, Add, Timeline } from '@material-ui/icons';
import { Card } from '../Card';
import { useContext } from 'react';
import { GlobalContext } from '../../context/GlobalState';
import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles({
  productRow: {
    display: 'flex',
    justifyContent: 'space-between',
  },
});

export default function MilestoneForm(props) {
  const { units, products } = useContext(GlobalContext);
  const {
    index,
    actions,
    date,
    productApplications,
    onChange,
    onBlur,
    name,
    errors,
    touched,
  } = props;
  const classes = useStyles();

  return (
    <Card
      header={`Milestone ${index + 1}`}
      style={{ marginTop: '32px' }}
      label={<Timeline fontSize="large" />}
      color="primary"
      actions={actions}
    >
      <Grid container spacing={3} justifyContent="space-between">
        <Grid item xs={4}>
          <DatePickerControl
            label="Application Date"
            name={`${name}.date`}
            required
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
                  <Grid container>
                    <Grid item xs={11}>
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
                    </Grid>
                    <Grid item xs={1}>
                      <IconButton
                        style={{ visibility: index === 0 && 'hidden' }}
                        onClick={(e) => arrayHelpers.remove(index)}
                      >
                        <Close />
                      </IconButton>
                    </Grid>
                  </Grid>
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
    </Card>
  );
}
