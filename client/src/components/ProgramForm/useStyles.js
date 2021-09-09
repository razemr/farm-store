import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles({
    paper: {
      margin: "0 20px",
      padding: "20px",
    },
    form: {
      "& .MuiFormControl-root": {
        width: "70%",
        marginBottom: "20px",
      },
    },
    milestoneForm: {
      width: "100%",
      position: "relative",
    },
    close: {
      position: "absolute",
      top: "10px",
      right: "10px",
    },
  });