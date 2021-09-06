import { Button, Grid } from "@material-ui/core";
import DatePickerControl from "../form-controls/date-picker/DatePickerControl";
import ProductRow from "../product-row/ProductRow";
import { FieldArray } from "formik";

export default function MilestoneForm(props) {
  const { date, productApplications, onChange, index } = props;

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
            name={`milestones.${index}.date`}
            value={date}
            onChange={onChange}
          />
        </Grid>
      </Grid>
      <FieldArray
        name={`milestones.${index}.productApplications`}
        render={(arrayHelpers) => (
          <div>
            {productApplications.length > 0 &&
              productApplications.map((p, i) => <ProductRow key={i} />)}
            <Button
              onClick={(e) =>
                arrayHelpers.push({
                  product: "",
                  quantity: "",
                  unit: "",
                })
              }
            >
              Add Product
            </Button>
          </div>
        )}
      />
    </div>
  );
}
