import React, { useState } from "react";
import { Grid, Container } from "@material-ui/core";
import { useQuery } from "@apollo/client";
import ReservationTable from "./reservationTable/ReservationTable";
import { GET_RESERVATIONS } from "../queries/ReservationQuery";
import ReservationButtonNew from "./ReservationButtonNew";
import ReservationPagination from "./ReservationPagination";

export default function Reservations() {
	const [currentPage, setCurrentPage] = useState(1);

	const { data, loading, error } = useQuery(GET_RESERVATIONS);
	if (loading) return <p>Loading...</p>;
	if (error) return <p>ERROR: {error.message}</p>;

	const { reservations } = data;
	const resPerPage = 5;
	const indexLastRes = currentPage * resPerPage;
	const indexFirstRes = indexLastRes - resPerPage;

	return (
		<>
			<Container component="main" maxWidth="lg">
				<Grid container spacing={3}>
					<ReservationButtonNew />
					<ReservationTable
						reservations={reservations.slice(indexFirstRes, indexLastRes)}
					/>
					<ReservationPagination
						lenReservations={reservations.length}
						page={resPerPage}
						currentPage={currentPage}
						setCurrentPage={setCurrentPage}
					/>
				</Grid>
			</Container>
		</>
	);
}
