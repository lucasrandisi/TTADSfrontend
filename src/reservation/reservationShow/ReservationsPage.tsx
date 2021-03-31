import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useQuery } from "@apollo/client";
import { Grid, Container, Button } from "@material-ui/core";

import ReservationTable from "./reservationTable/ReservationTable";
import { GET_RESERVATIONS } from "../queries/ReservationQuery";

export default function ReservationsPage() {
	const { data, loading, error } = useQuery(GET_RESERVATIONS);
	if (loading) return <p>Loading...</p>;
	if (error) return <p>ERROR: {error.message}</p>;

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
					</Header>

					<ReservationTable reservations={data.reservations} />
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
