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
	} else if(!res.order?.paidAt){
		return "canceled"
	}
	return "served";
}

export default function ReservationTableRow({ res }) {
	return (
		<>
			<TableRow hover key={res.id} tabIndex={-1}>
				<TableCell>#{res.id}</TableCell>
				<TableCell>
					<ReservationState status={status(res)} />
				</TableCell>
				<TableCell>{moment(res.reservationDateTime).format("DD/MM/YYYY")}</TableCell>
				<TableCell>{moment(res.reservationDateTime).format("HH:mm")}</TableCell>
				<TableCell>{res.customerName}</TableCell>
				<TableCell>{res.partySize}</TableCell>
				<TableCell>
					<ReservationTableRowActions res={res} />
				</TableCell>
			</TableRow>
		</>
	);
}
