import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import "../styles/index.scss"

export default function BasicModal(props) {

    const [state, setState] = useState(true);

    const handleClose = () => {
        setState(false);
        props.setChildrenModal(<></>)
    };

    const handleAction = () => {
		// deleteReservation({ variables: { id: idReservation } });
        props.handleAction();
		handleClose();
    }
  return (
    <Dialog
        open={state}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
    >
        <DialogTitle>{props.title}</DialogTitle>
        <DialogContent>
            {props.children}
        </DialogContent>
        <DialogActions>
            <Button onClick={handleClose} color="primary">
                Back
            </Button>
            <Button 
                type="submit"
                onClick={handleAction} color="primary" autoFocus>
                {props.buttonText ? props.buttonText : "Accept"}
            </Button>            
        </DialogActions>
    </Dialog>
  )
}