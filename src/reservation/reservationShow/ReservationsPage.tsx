import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useQuery } from "@apollo/client";
import { Grid, Container, Button } from "@material-ui/core";

import ReservationTable from "./reservationTable/ReservationTable";
import ReservationFilters from "./ReservationFilters";
import { GET_RESERVATIONS } from "../queries/ReservationQuery";
import ReservationPagination from "./ReservationPagination";

export default function ReservationsPage() {
	// Pagination
	const [currentPage, setCurrentPage] = useState(1);
	// Filters
	const [searchInput, setSearchInput] = useState("");
	const [from, setFrom] = useState<Date | undefined>();
	const [to, setTo] = useState<Date | undefined>();

	const { data, loading, error } = useQuery(GET_RESERVATIONS);
	if (loading) return <p>Loading...</p>;
	if (error) return <p>ERROR: {error.message}</p>;

	const { reservations } = data;
	const resPerPage = 8;
	const indexLastRes = currentPage * resPerPage;
	const indexFirstRes = indexLastRes - resPerPage;

	const handleResetFliters = () => {
		setFrom(undefined);
		setTo(undefined);
		setSearchInput("");
	};

	const filterSearch = () => {
		if (!searchInput && !to && !from) {
			return reservations;
		}

		let search = reservations;
		if (searchInput) {
			search = search.filter(r =>
				r.customerName.toLowerCase().includes(searchInput.toLowerCase())
			);
		}

		if (from && to) {
			search = search.filter(r => {
				return (
					r?.reservationDateTime <= to.toISOString() &&
					r?.reservationDateTime >= from.toISOString()
				);
			});
		}
		return search;
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
							from={from}
							setFrom={setFrom}
							to={to}
							setTo={setTo}
							onReset={handleResetFliters}
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
