import React from "react";
import { TableCell, makeStyles, Chip } from "@material-ui/core";
import moment from "moment";

import CloseIcon from "@material-ui/icons/Close";
import DoneIcon from "@material-ui/icons/Done";
import HourglassEmptyIcon from "@material-ui/icons/HourglassEmpty";

const useStyles = makeStyles(() => ({
	normal: {
		borderRadius: 10,
		padding: 0.5,
	},
	served: {
		backgroundColor: "#8bc34a",
		color: "#FFFFFF",
		borderRadius: 10,
		padding: 0.5,
	},
	servedIcon: {
		color: "#FFFFFF",
	},
}));

export default function ReservationState({ res }) {
	const classes = useStyles();
	const pastDate = moment(res.reservationDateTime).diff(moment(new Date())) < 0;
	return (
		<>
			<TableCell align="center">
				{res.cancelationDateTime && (
					<Chip
						label="Canceled"
						className={classes.normal}
						color="secondary"
						size="small"
						icon={<CloseIcon />}
					/>
				)}
				{!pastDate && (
					<Chip
						label="Pending"
						className={classes.normal}
						color="primary"
						size="small"
						icon={<HourglassEmptyIcon />}
					/>
				)}
				{pastDate && (
					<Chip
						label="Served"
						className={classes.served}
						size="small"
						icon={<DoneIcon className={classes.servedIcon} />}
					/>
				)}
			</TableCell>
		</>
	);
}
