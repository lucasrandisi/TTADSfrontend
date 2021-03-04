import React from "react";
import { Grid, Container } from "@material-ui/core";
import { useQuery } from "@apollo/client";
import ReservationTable from "./reservationTable/ReservationTable";
import { GET_RESERVATIONS } from "../queries/ReservationQuery";
import ReservationButtonNew from "./ReservationButtonNew";

export default function Reservations() {
	const { data, loading, error } = useQuery(GET_RESERVATIONS);
	if (loading) return <p>Loading...</p>;
	if (error) return <p>ERROR: {error.message}</p>;

	const { reservations } = data;
	return (
		<>
			<Container component="main" maxWidth="lg">
				<Grid container spacing={3}>
					<ReservationButtonNew />
					<ReservationTable reservations={reservations} />
				</Grid>
			</Container>
		</>
	);
}
