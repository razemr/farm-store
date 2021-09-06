import { FormControl, InputLabel, MenuItem, Select } from "@material-ui/core";
import React from "react";

export default function SelectControl(props) {
  const { name, label, value, onChange, options } = props;

  return (
    <FormControl>
      <InputLabel>{label}</InputLabel>
      <Select name={name} value={value} onChange={onChange}>
        {options.map((o) => (
          <MenuItem key={o.key} value={o.value}>
            {o.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
