import CreateReservation from 'reservation/reservationCreate/CreateReservation'
import React, {useState} from 'react';
import Dialog from '@material-ui/core/Dialog';
import "./reservation.scss";

export default function ReservationEdit({res, setChildrenModal}) {

    const [state, setState] = useState(true);

    const handleClose = () => {
        setState(false);
        setChildrenModal(<></>);
    };

    return (
        <Dialog
            open={state}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            className='reservation-edit'
        >
            <CreateReservation editReservation={res}/>
        </Dialog>
    )
}