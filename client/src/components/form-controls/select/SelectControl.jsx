import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  FormHelperText,
} from "@material-ui/core";
import React from "react";

export default function SelectControl(props) {
  const { name, label, value, onChange, options, error, helperText } = props;
  return (
    <FormControl error={error}>
      <InputLabel>{label}</InputLabel>
      <Select name={name} value={value} onChange={onChange}>
        {options &&
          options.length > 0 &&
          options.map((o) => (
            <MenuItem key={o.key} value={o.value}>
              {o.label}
            </MenuItem>
          ))}
      </Select>
      <FormHelperText hidden={helperText === "" || helperText === undefined}>
        {helperText}
      </FormHelperText>
    </FormControl>
  );
}
