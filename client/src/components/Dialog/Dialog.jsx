import {
    Dialog as MuiDialog,
    DialogContent,
    Typography,
    Paper
  } from '@material-ui/core';
  import { makeStyles } from '@material-ui/core';
  import './Dialog.css';
  
  const useStyles = (props) =>
    makeStyles((theme) => ({
      paperRoot: {
        background: theme.customBackgrounds[`${props.color}`],
        boxShadow: theme.customShadows[`${props.color}`],
      },
      dialogRoot: {
        overflowY: 'visible',
      },
      dialogPaper: {
        overflowY: 'visible',
      },
      dialogContentRoot: {
        overflowY: 'visible',
      },
    }));


export default function Dialog(props) {
  const { title, content, actions, color, open } = props;
  const classes = useStyles({ color: color || 'primary' })();
  return (
    <MuiDialog
      open={open}
      classes={{ root: classes.dialogRoot, paper: classes.dialogPaper }}
      PaperProps={{elevation: 1}}
    >
      <DialogContent
        classes={{ root: classes.dialogContentRoot }}
        className="dialog-content"
      >
        <Paper classes={{ root: classes.paperRoot }} className="dialog-header">
          <Typography variant="h4">{title}</Typography>
        </Paper>

        <div>{content}</div>

        <div className="dialog-actions">{actions}</div>
      </DialogContent>
    </MuiDialog>
  );
}
