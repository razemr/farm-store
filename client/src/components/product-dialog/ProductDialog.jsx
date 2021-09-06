import {
  Dialog,
  DialogActions,
  Button,
  DialogTitle,
  DialogContent,
} from "@material-ui/core";

export default function ProductDialog(props) {
  const { open } = props;

  const handleNext = () => {};

  const handleBack = () => {};

  return (
    <Dialog open={true}>
      <DialogTitle>Program Wizard</DialogTitle>
      <DialogContent></DialogContent>
      <DialogActions>
        <Button onClick={handleBack} color="primary">
          Back
        </Button>
        <Button variant="contained" onClick={handleNext} color="primary">
          Next
        </Button>
      </DialogActions>
    </Dialog>
  );
}
