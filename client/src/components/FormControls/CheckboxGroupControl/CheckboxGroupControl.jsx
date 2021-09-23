import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { Checkbox, FormGroup, Grid } from '@material-ui/core';

export default function CheckboxGroupControl(props) {
  const { options, onChange, values, helperText, columns, name, ...other } =
    props;
  const columnCount = columns | 1;
  let counts = [];

  for (let i = 0; i < columnCount; i++) {
    counts.push(i);
  }

  const handleOnChange = (newValue, checked) => {
    if (checked) {
      return { target: { name, value: [...values, newValue] } };
    } else {
      return {
        target: { name, value: values.filter((value) => value !== newValue) },
      };
    }
  };

  return (
    <FormControl {...other}>
      <Grid container>
        {counts.map((count) => (
          <Grid key={count} item xs={Math.floor(12 / columnCount)}>
            <FormGroup>
              {options
                ? options
                    .filter((o, index) => index % columnCount === count)
                    .map((option) => (
                      <FormControlLabel
                        key={option.value}
                        control={
                          <Checkbox
                            name={name}
                            value={option.value}
                            checked={
                              values &&
                              values.find((value) => value === option.value)
                                ? true
                                : false
                            }
                            onChange={(e) =>
                              onChange(
                                handleOnChange(option.value, e.target.checked),
                              )
                            }
                          />
                        }
                        label={option.label}
                      />
                    ))
                : ''}
            </FormGroup>
          </Grid>
        ))}
      </Grid>
      <FormHelperText hidden={helperText === '' || helperText === undefined}>
        {helperText}
      </FormHelperText>
    </FormControl>
  );
}
