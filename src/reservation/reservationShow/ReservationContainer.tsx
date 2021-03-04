import React, { useState } from "react";
import { Grid, Container } from "@material-ui/core";
import { useQuery } from "@apollo/client";
import moment from "moment";
import ReservationTable from "./reservationTable/ReservationTable";
import ReservationFilters from "./ReservationFilters";
import { GET_RESERVATIONS } from "../queries/ReservationQuery";
import ReservationButtonNew from "./ReservationButtonNew";
import ReservationPagination from "./ReservationPagination";

export default function Reservations() {
	const [searchInput, setSearchInput] = useState("");
	const [currentPage, setCurrentPage] = useState(1);

	const { data, loading, error } = useQuery(GET_RESERVATIONS);
	if (loading) return <p>Loading...</p>;
	if (error) return <p>ERROR: {error.message}</p>;

	const { reservations } = data;
	const resPerPage = 5;
	const indexLastRes = currentPage * resPerPage;
	const indexFirstRes = indexLastRes - resPerPage;

	const filterSearch = () => {
		if (!searchInput) {
			return reservations;
		}

		return reservations.filter(
			r =>
				r.customerName.toLowerCase().includes(searchInput.toLowerCase()) ||
				moment(r.reservationDateTime)
					.format("DD/MM/YYYY HH:MM")
					.toString()
					.includes(searchInput)
		);
	};

	return (
		<>
			<Container component="main" maxWidth="lg">
				<Grid container spacing={3}>
					<ReservationButtonNew />
					<ReservationFilters searchInput={searchInput} setSearchInput={setSearchInput} />
					<ReservationTable
						reservations={filterSearch().slice(indexFirstRes, indexLastRes)}
					/>
					<ReservationPagination
						lenReservations={filterSearch().length}
						page={resPerPage}
						currentPage={currentPage}
						setCurrentPage={setCurrentPage}
					/>
				</Grid>
			</Container>
		</>
	);
}
