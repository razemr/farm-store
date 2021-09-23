import { Dialog } from '../Dialog';
import { Button } from '@material-ui/core';

export default function ConfirmationDialog(props) {
  const { open, title, content, cancelLabel, confirmLabel, onCancel, onConfirm } =
    props;
  return (
    <Dialog
      open={open}
      title={title}
      content={content}
      actions={
        <>
          <Button onClick={onCancel}>
            {cancelLabel ? cancelLabel : 'Cancel'}
          </Button>
          &nbsp; &nbsp;
          <Button variant="contained" color="primary" onClick={onConfirm}>
            {confirmLabel ? confirmLabel : 'Confirm'}
          </Button>
        </>
      }
    />
  );
}
