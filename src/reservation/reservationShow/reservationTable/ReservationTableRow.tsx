import React from "react";
import moment from "moment";

import { TableCell, TableRow } from "@material-ui/core";

import ReservationState from "./ReservationState";
import { ReservationTableRowActions } from "./ReservationTableRowActions";

type Status = "canceled" | "pending" | "served" | "overtime" | undefined;

function status(res) {
	if (res.cancelationDateTime) {
		return "canceled";
	}

	const pastDate = moment(res.reservationDateTime).diff(moment(new Date())) < 0;
	if (!pastDate) {
		return "pending";
	}
	return "served";
}

export default function ReservationTableRow({ res }) {
	return (
		<>
			<TableRow hover key={res.id} tabIndex={-1}>
				<TableCell>
					<ReservationState status={status(res)} />
				</TableCell>
				<TableCell align="left">
					{moment(res.reservationDateTime).format("DD/MM/YYYY")}
				</TableCell>
				<TableCell align="center">
					{moment(res.reservationDateTime).format("HH:mm")}
				</TableCell>
				<TableCell>{res.customerName}</TableCell>
				<TableCell align="center">{res.partySize}</TableCell>
				<TableCell>
					<ReservationTableRowActions res={res} />
				</TableCell>
			</TableRow>
		</>
	);
}
