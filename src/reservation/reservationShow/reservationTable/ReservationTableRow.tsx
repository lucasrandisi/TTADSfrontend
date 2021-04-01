import React from "react";
import moment from "moment";

import { TableCell, TableRow } from "@material-ui/core";

import ReservationState from "./ReservationState";
import { ReservationTableRowActions } from "./ReservationTableRowActions";

export default function ReservationTableRow({ res }) {
	return (
		<>
			<TableRow hover key={res.id} tabIndex={-1}>
				<ReservationState res={res} />
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
