import { Grid, IconButton, makeStyles } from "@material-ui/core";
import DatePickerControl from "../form-controls/date-picker/DatePickerControl";
import ProductRow from "../product-row/ProductRow";
import { FieldArray } from "formik";
import { Close, Add } from "@material-ui/icons";
import { boolean } from "yup/lib/locale";

const useStyles = makeStyles({
  productRow: {
    display: "flex",
    justifyContent: "space-between",
  },
});

export default function MilestoneForm(props) {
  const { date, productApplications, onChange, onBlur, name, errors, touched } =
    props;
  const classes = useStyles();

  return (
    <div
      style={{
        border: "1px solid #f5f0f0",
        padding: "20px",
        marginBottom: "20px",
      }}
    >
      <Grid container>
        <Grid item xs={4}>
          <DatePickerControl
            label="Application Date"
            name={`${name}.date`}
            value={date}
            onBlur={onBlur}
            onChange={onChange}
            error={touched && errors && touched.date && errors.date ? true : false}
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
                    style={{ visibility: index === 0 && "hidden" }}
                    onClick={(e) => arrayHelpers.remove(index)}
                  >
                    <Close />
                  </IconButton>
                </div>
              ))}
            <IconButton
              onClick={(e) =>
                arrayHelpers.push({
                  product: "",
                  quantity: "",
                  unit: "",
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
