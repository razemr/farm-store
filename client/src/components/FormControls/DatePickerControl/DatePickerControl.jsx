import {
    KeyboardDatePicker,
    MuiPickersUtilsProvider,
  } from "@material-ui/pickers";
  import DateFnsUtils from "@date-io/date-fns";
  
  export default function DatePickerControl(props) {
    const { name, label, value, onChange, ...other } = props;
    const convertToDefEventParam = (name, value) => ({
      target: {
        name,
        value,
      },
    });
    return (
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          {...other}
          disableToolbar
          variant="inline"
          label={label}
          format="dd/MMM/yyyy"
          name={name}
          value={value}
          onChange={(date) => onChange(convertToDefEventParam(name, date))}
        ></KeyboardDatePicker>
      </MuiPickersUtilsProvider>
    );
  }
  