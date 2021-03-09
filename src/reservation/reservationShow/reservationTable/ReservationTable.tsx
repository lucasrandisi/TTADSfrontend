import React from "react";
import {
	Table,
	TableBody,
	TableContainer,
	Paper,
	Grid,
	TableCell,
	TableHead,
	TableRow,
} from "@material-ui/core";
import styled from "styled-components";

import ReservationTableRow from "./ReservationTableRow";

export default function ReservationTable({ reservations }) {
	return (
		<Grid item xs={12}>
			<TableContainer component={Paper}>
				<TableFix size="small" aria-label="custom pagination table">
					<TableHead>
						<TableRow>
							<TableCell align="center">More Info</TableCell>
							<TableCell align="center">State</TableCell>
							<TableCell align="center">Date</TableCell>
							<TableCell align="center">Hour</TableCell>
							<TableCell align="center">Customer&nbsp;name</TableCell>
							<TableCell align="center">Number&nbsp;of&nbsp;people</TableCell>
							<TableCell align="center">Delete</TableCell>
							<TableCell align="center">Edit</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{reservations.map(res => (
							<ReservationTableRow res={res} key={res.id} />
						))}
					</TableBody>
				</TableFix>
			</TableContainer>
		</Grid>
	);
}

const TableFix = styled(Table)`
	min-width: 650;
`;
