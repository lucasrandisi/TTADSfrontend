import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { CANCEL_RESERVATION, GET_RESERVATIONS } from "../../queries/ReservationQuery";
import { useMutation } from "@apollo/client";
import "./reservationCancel.scss";

export default function ReservationCancelModal({idReservation, setChildrenModal}) {

    const [state, setState] = useState(true);

    const [cancelReservation] = useMutation(CANCEL_RESERVATION, {
		refetchQueries: [{ query: GET_RESERVATIONS }],
	});

    const handleClose = () => {
        setState(false);
        setChildrenModal(<></>);
    };

    const handleCancel = () => {
		cancelReservation({ variables: { id: idReservation } });
		handleClose();
    }

    return (
        <Dialog
            open={state}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle>Are you sure you want to cancel the booking?</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    If you accept, the booking will be canceled
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Back
                </Button>
                <Button onClick={handleCancel} color="primary" autoFocus>
                    Cancel booking
                </Button>
            </DialogActions>
        </Dialog>
    )
}
