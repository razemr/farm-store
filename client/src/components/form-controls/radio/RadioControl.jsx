import {
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
} from "@material-ui/core";

export default function RadioControl(props) {
    const {name, options, value, label, onChange} = props;
  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">{label}</FormLabel>
      <RadioGroup
        name={name}
        value={value}
        onChange={onChange}
      >
          {options.length > 0 && options.map((option, i) => <FormControlLabel key={i} value={option.value} control={<Radio />} label={option.label}/>)}
      </RadioGroup>
    </FormControl>
  );
}
