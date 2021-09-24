import { Formik } from 'formik';
import { Grid, TextField, Button, makeStyles } from '@material-ui/core';
import { validationSchema } from './validationSchema';
import { Storefront } from '@material-ui/icons';
import { Card } from '../Card';
import { SelectControl } from '../FormControls/SelectControl';
import { useContext } from 'react';
import { GlobalContext } from '../../context/GlobalState';

const useStyles = makeStyles({
  form: {
    '& .MuiFormControl-root': {
      width: '100%',
      marginBottom: '16px !important',
    },
  },
});

export default function ProductForm(props) {
  const { product, onSubmit, title } = props;
  const classes = useStyles();
  const { productCategories, companies } = useContext(GlobalContext);

  return product ? (
    <Grid container justifyContent="center">
      <Grid item xs={8}>
        <Formik
          enableReinitialize={true}
          initialValues={product}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            onSubmit(values);
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
          }) => (
            <form className={classes.form}>
              <Card
                header={title}
                label={<Storefront fontSize="large" />}
                color="primary"
              >
                <Grid container spacing={10}>
                  <Grid item xs={12}>
                    <TextField
                      label="Name"
                      name="name"
                      required
                      value={values.name}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={touched.name && Boolean(errors.name)}
                      helperText={touched.name ? errors.name : null}
                    />
                    <SelectControl
                      name="category"
                      label="Category"
                      required
                      value={values.category}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      options={productCategories.map((category) => ({
                        key: category._id,
                        value: category._id,
                        label: category.name,
                      }))}
                      error={touched.category && Boolean(errors.category)}
                      helperText={touched.category ? errors.category : null}
                    ></SelectControl>
                    <TextField
                        label="Description"
                        name="description"
                        multiline
                        required
                        value={values.description}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        error={
                          touched.description && Boolean(errors.description)
                        }
                        helperText={
                          touched.description ? errors.description : null
                        }
                      />
                      <SelectControl
                      name="company"
                      label="Company"
                      required
                      value={values.company}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      options={companies.map((company) => ({
                        key: company._id,
                        value: company._id,
                        label: company.name,
                      }))}
                      error={touched.company && Boolean(errors.company)}
                      helperText={touched.company ? errors.company : null}
                    ></SelectControl>
                  </Grid>
                  
                </Grid>
              </Card>
              <div
                style={{
                  marginTop: '16px',
                  display: 'flex',
                  justifyContent: 'flex-end',
                }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  onClick={(e) => handleSubmit()}
                >
                  Submit
                </Button>
              </div>
            </form>
          )}
        </Formik>
      </Grid>
    </Grid>
  ) : (
    ''
  );
}
