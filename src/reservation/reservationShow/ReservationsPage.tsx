import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useQuery } from "@apollo/client";
import moment from "moment";
import { Grid, Container, Button } from "@material-ui/core";

import ReservationTable from "./reservationTable/ReservationTable";
import ReservationFilters from "./ReservationFilters";
import { GET_RESERVATIONS } from "../queries/ReservationQuery";
import ReservationPagination from "./ReservationPagination";

export default function ReservationsPage() {
	const [searchInput, setSearchInput] = useState("");
	const [currentPage, setCurrentPage] = useState(1);

	const { data, loading, error } = useQuery(GET_RESERVATIONS);
	if (loading) return <p>Loading...</p>;
	if (error) return <p>ERROR: {error.message}</p>;

	const { reservations } = data;
	const resPerPage = 8;
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
				<h1>Reservations</h1>

				<Grid container spacing={3}>
					<Header>
						<StyledLink to="/reservation/new">
							<Button type="submit" variant="contained" color="primary">
								+ New
							</Button>
						</StyledLink>

						<ReservationFilters
							searchInput={searchInput}
							setSearchInput={setSearchInput}
						/>
					</Header>

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

const StyledLink = styled(Link)`
	text-decoration: none;
`;

const Header = styled.div`
	margin-top: 1rem;
	padding: 0px 12px;

	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	align-items: center;
`;
