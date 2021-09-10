import { FormControl, FormControlLabel, Checkbox } from '@material-ui/core';

export default function CheckboxControl(props) {
  const { name, label, value, onChange, disabled} = props;
  const convertToDefEventPara = (name, value) => ({
    target: {
      name,
      value,
    },
  });

  return (
    <FormControl>
      <FormControlLabel
        control={
          <Checkbox
            disabled={disabled}
            name={name}
            color="primary"
            checked={value}
            onChange={(e) =>
              onChange(convertToDefEventPara(name, e.target.checked))
            }
          />
        }
        label={label}
      />
    </FormControl>
  );
}
