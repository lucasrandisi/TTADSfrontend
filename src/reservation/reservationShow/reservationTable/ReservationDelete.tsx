import React from "react";
import { useMutation } from "@apollo/client";

import DeleteIcon from "@material-ui/icons/Delete";
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	MenuItem,
	ListItemIcon,
	ListItemText,
} from "@material-ui/core";
import moment from "moment";

import { DELETE_RESERVATION, GET_RESERVATIONS } from "../../queries/ReservationQuery";

export default function ReservationDelete(props) {
	const { res } = props;
	const [open, setOpen] = React.useState(false);

	const [deleteReservation] = useMutation(DELETE_RESERVATION, {
		refetchQueries: [{ query: GET_RESERVATIONS }],
	});

	const handleClose = () => {
		setOpen(false);
	};

	const onDelete = id => {
		deleteReservation({ variables: { id } });
		handleClose();
	};

	const handleClickOpen = () => {
		setOpen(true);
	};

	return (
		<>
			<MenuItem onClick={handleClickOpen}>
				<ListItemIcon aria-label="delete">
					<DeleteIcon />
				</ListItemIcon>
				<ListItemText primary="Delete" />
			</MenuItem>

			<Dialog open={open} onClose={handleClose}>
				<DialogContent>
					<DialogContentText>
						{`Delete reservation for the date ${moment(res.reservationDateTime).format(
							"DD/MM/YYYY"
						)}?`}
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose} color="primary">
						Cancel
					</Button>
					<Button onClick={onDelete} color="primary" autoFocus>
						Delete
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
}
