import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core';
import React, { useState } from 'react'

export default function TemplateSelection(props) {
    const { onClose, open } = props;
    const [selectedTemplate, setSelectedTemplate] = useState(null);

    const handleClose = () => {
        onClose();
    }

    return (
        <Dialog onClose={handleClose} open={open}>
            <DialogTitle>Select Program Template</DialogTitle>
            <DialogContent>
                Hello
            </DialogContent>
            <DialogActions>
                <Button>Submit</Button>
                <Button>Cancel</Button>
            </DialogActions>
        </Dialog>
    )
}
