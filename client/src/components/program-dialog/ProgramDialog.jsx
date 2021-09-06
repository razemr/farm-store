import {
  Dialog,
  DialogContent,
} from "@material-ui/core";
import { ProgramStepper } from "../index";
import { makeStyles } from "@material-ui/core";
import { CustomDialogTitle as DialogTitle } from "../index";

const useStyles = makeStyles({
  content: {
    minWidth: "600px",
  }
})

export default function ProductDialog(props) {
  const { open, onClose, onManual, onTemplate } = props;
  const classes = useStyles();

  return (
    <Dialog open={open}>
      <DialogTitle onClose={onClose} >Create Program</DialogTitle>
      <DialogContent className={classes.content}>
        <ProgramStepper onManual={onManual} onTemplate={onTemplate}></ProgramStepper>
      </DialogContent>
    </Dialog>
  );
}
