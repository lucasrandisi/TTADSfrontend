import React from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import {
	IconButton,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	TableCell,
} from "@material-ui/core";
import moment from "moment";

export default function ReservationDelete(props) {
	const { res, handleDelete } = props;
	const [open, setOpen] = React.useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const onDelete = () => {
		handleDelete(res.id);
		handleClose();
	};
	return (
		<>
			<TableCell align="center">
				<IconButton aria-label="delete" onClick={handleClickOpen}>
					<DeleteIcon />
				</IconButton>
			</TableCell>

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
						{" "}
						Cancel{" "}
					</Button>
					<Button onClick={onDelete} color="primary" autoFocus>
						{" "}
						Delete{" "}
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
}
