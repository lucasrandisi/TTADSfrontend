import React from "react";
import moment from "moment";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import { Grid, Button } from "@material-ui/core";
import { useQuery } from "@apollo/client";
import { GET_RESERVATION } from "../../queries/ReservationQuery";

export default function ReservationMoreInfo() {
	const { id } = useParams();
	const { data, loading, error } = useQuery(GET_RESERVATION, {
		variables: { id },
	});

	if (loading) return <p>Loading...</p>;
	if (error) return <p>ERROR: {error.message}</p>;
	if (!data.reservation) return <p>Reservation not found</p>;

	const res = data.reservation;
	return (
		<Grid item xs={12}>
			<h1>Reservation information</h1>
			<p>Cuestomer name: {res.customerName}</p>
			<p>Email: {res.email}</p>
			<p>Phone: {res.phone}</p>
			<p>Party size: {res.table.size} chairs</p>
			<p>Table id: {res.table.id}</p>
			<p>Reserved at {moment(res.reservationDateTime).format("DD/MM/YYYY HH:MM")}</p>
			{res.cancelationDateTime && (
				<p>Cancelled at {moment(res.cancelationDateTime).format("DD/MM/YYYY HH:MM")}</p>
			)}
			<ButtonLink to="/reservations">
				<Button type="submit" variant="contained" color="primary">
					Return
				</Button>
			</ButtonLink>
		</Grid>
	);
}
const ButtonLink = styled(Link)`
	text-decoration: none;
`;
