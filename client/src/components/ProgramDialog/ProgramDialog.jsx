import {
    Dialog,
    DialogContent,
  } from "@material-ui/core";
  import { ProgramStepper } from "../ProgramStepper";
  import { makeStyles } from "@material-ui/core";
  import { CustomDialogTitle as DialogTitle } from "../CustomDialogTitle";
  
  const useStyles = makeStyles({
    content: {
      minWidth: "600px",
    }
  })
  
  export default function ProgramDialog(props) {
    const { open, onClose, onManual, onTemplate } = props;
    const classes = useStyles();
  
    return (
      <Dialog open={open}>
        {/* <DialogTitle onClose={onClose} >Create Program</DialogTitle> */}
        <DialogContent className={classes.content}>
          <ProgramStepper onManual={onManual} onTemplate={onTemplate}></ProgramStepper>
        </DialogContent>
      </Dialog>
    );
  }
  