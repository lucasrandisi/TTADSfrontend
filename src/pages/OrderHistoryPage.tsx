import React from "react";
import {useQuery, gql} from "@apollo/client";

import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
} from "@material-ui/core";

const GET_ORDERS = gql`
	query {
		orders {
			id
			createdAt
			status
		}
	}
`;

export default function HistoryPage() {
	const {data, loading, error} = useQuery(GET_ORDERS);

	if (loading) return <p>Loading...</p>;
	if (error) return <p>ERROR: {error.message}</p>;
	return (
		<TableContainer component={Paper}>
			<Table size="medium" aria-label="a dense table">
				<TableHead>
					<TableRow>
						<TableCell>Order</TableCell>
						<TableCell align="right">Order at</TableCell>
						<TableCell align="right">Status</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{data?.orders.map((row) => (
						<TableRow key={row.id}>
							<TableCell component="th" scope="row">
								{row.id}
							</TableCell>
							<TableCell align="right">{row.createdAt}</TableCell>
							<TableCell align="right">{row.status}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
}
