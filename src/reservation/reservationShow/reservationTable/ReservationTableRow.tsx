import React from "react";
import { TableCell, TableRow, IconButton, makeStyles } from "@material-ui/core";
import moment from "moment";
import { Link } from "react-router-dom";
import { MoreHoriz } from "@material-ui/icons";
import CreateIcon from "@material-ui/icons/Create";
import { useMutation } from "@apollo/client";
import ReservationDelete from "./ReservationDelete";
import ReservationState from "./ReservationState";
import { DELETE_RESERVATION, GET_RESERVATIONS } from "../../queries/ReservationQuery";

const useStyles = makeStyles(() => ({
	hover: {
		"&:hover": {
			backgroundColor: "#f4f4f4 !important",
		},
	},
	text: {
		textAlign: "center",
	},
}));

export default function ReservationTableRow({ res }) {
	const classes = useStyles();

	const [deleteReservation] = useMutation(DELETE_RESERVATION, {
		refetchQueries: [{ query: GET_RESERVATIONS }],
	});

	const handleDelete = id => {
		deleteReservation({ variables: { id } });
	};
	return (
		<>
			<TableRow className={classes.text}>
				<TableCell component="th" scope="row" align="center">
					<Link to={`/reservation/info/${res.id}`}>
						<IconButton aria-label="edit">
							<MoreHoriz />
						</IconButton>
					</Link>
				</TableCell>
				<ReservationState res={res} />
				<TableCell align="center">
					{moment(res.reservationDateTime).format("DD/MM/YYYY")}
				</TableCell>
				<TableCell align="center">
					{moment(res.reservationDateTime).format("HH:mm")}
				</TableCell>
				<TableCell>{res.customerName}</TableCell>
				<TableCell align="center">{res.partySize}</TableCell>
				<ReservationDelete res={res} handleDelete={handleDelete} />
				<TableCell align="center">
					<Link to={`/reservation/edit/${res.id}`}>
						<IconButton aria-label="edit">
							<CreateIcon />
						</IconButton>
					</Link>
				</TableCell>
			</TableRow>
		</>
	);
}
