import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  FormHelperText,
} from "@material-ui/core";

export default function SelectControl(props) {
  const { name, label, value, onChange, options, error, helperText, ...other} = props;
  return (
    <FormControl error={error} {...other}>
      <InputLabel>{label}</InputLabel>
      <Select name={name} value={value} onChange={onChange}>
        <MenuItem value=""></MenuItem>
        {options.map((option) => (
          <MenuItem key={option.key} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
      <FormHelperText hidden={helperText === "" || helperText === undefined}>
        {helperText}
      </FormHelperText>
    </FormControl>
  );
}
