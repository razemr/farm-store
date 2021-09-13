import {
    Dialog as MuiDialog,
    DialogContent as MuiDialogContent,
    DialogTitle as MuiDialogTitle,
    Paper
  } from "@material-ui/core";
  import { makeStyles } from "@material-ui/core";

  const useStyles = (props) => makeStyles((theme) => ({
    paperRoot: {
        background: theme.customBackgrounds[`${props.color}`],
        boxShadow: theme.customShadows[`${props.color}`],
    }
  }));

export default function Dialog(props) {
    const {color} = props;
    const classes = useStyles({color});
  return (
    <MuiDialog>
      <MuiDialogTitle>
      <Paper>

</Paper>
      </MuiDialogTitle>
      <MuiDialogContent>
        <Paper>

        </Paper>
      </MuiDialogContent>
    </MuiDialog>
  );
}
