import React from "react";
import { useMutation } from "@apollo/client";
import DeleteIcon from "@material-ui/icons/Delete";
import {
	IconButton,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	TableCell,
} from "@material-ui/core";
import moment from "moment";
import { DELETE_RESERVATION } from "../../queries/ReservationQuery";

export default function ReservationDelete(props) {
	const { res, setDeleted } = props;
	const [open, setOpen] = React.useState(false);
	const [deleteReservation] = useMutation(DELETE_RESERVATION);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleDelete = () => {
		deleteReservation({ variables: { id: res.id } });
		setDeleted(true);
		handleClose();
	};

	return (
		<>
			<TableCell align="center">
				<IconButton aria-label="delete" onClick={handleClickOpen}>
					<DeleteIcon />
				</IconButton>
			</TableCell>
			<Dialog
				open={open}
				onClose={handleClose}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description">
				<DialogTitle id="alert-dialog-title">
					{`Delete reservation for the date 
                        ${moment(res.reservationDateTime).format("DD/MM/YYYY HH:SS")}?`}
				</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-description">
						Lorem ipsum dolor sit amet, consectetur adipisicing elit. Enim sint aut
						distinctio!
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose} color="primary">
						{" "}
						Cancel{" "}
					</Button>
					<Button onClick={handleDelete} color="primary" autoFocus>
						{" "}
						Delete{" "}
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
}
