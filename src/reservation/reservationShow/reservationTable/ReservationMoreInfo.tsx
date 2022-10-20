//@ts-nocheck
import React from "react";
import moment from "moment";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import { Grid, Button, Card, Box } from "@material-ui/core";
import { useQuery } from "@apollo/client";
import { GET_RESERVATION } from "../../queries/ReservationQuery";
import "./reservation.scss";

export default function ReservationMoreInfo() {
	const { id } = useParams();
	const { data, loading, error } = useQuery(GET_RESERVATION, {
		variables: { id },
	});

	if (loading) return <p>Loading...</p>;
	if (error) return <p>ERROR: {error.message}</p>;
	if (!data.reservation) return <p>Reservation not found</p>;

	const subData = { ...data.reservation };
	const res = {
		...subData, 
		tableId: subData.table.id,
		tableSize: subData.table.size,
		reservationDate: moment(subData.reservationDateTime).format("DD/MM/YYYY"),
		cancelationDateTime: moment(subData.cancelationDateTime).format("DD/MM/YYYY HH:mm"),
		reservationTime: moment(subData.reservationDateTime).format("HH:mm")
	};
	return (
		<Grid item xs={12}>
			<Title>Booking information</Title>
			<Card className="reservation-info">
				<SubP>Personal information:</SubP>
					<List>
						{ personalInfo.map(info =>
							<li><P>{info.label} {res[info.name]}</P></li>
						)}						
					</List>
				<SubP>Booking information:</SubP>
					<List>
						{ bookingInfo.map(info =>
							<li><P>{info.label} {res[info.name]}</P></li>
						)}
					</List>
			</Card>
			<Box textAlign='center' style={{marginTop: "20px"}}>
				<ButtonLink to="/reservations">
					<Button type="submit" variant="contained" color="primary">
						Return
					</Button>
				</ButtonLink>
			</Box>
		</Grid>
	);
}
const ButtonLink = styled(Link)`
	text-decoration: none;
`;

const P = styled.p`
	margin-bottom: 8px;
`

const SubP = styled.p`
	margin-top: 18px;
	margin-bottom: 15px;
	font-weight: 600;
	text-align: center;
`

const List = styled.ul`
	margin-left: 40px;
`

const Title = styled.h1`
	text-align: center;
	margin-top: 20px;
	margin-bottom: 20px;
`

const personalInfo = [
	{
		name:"customerName",
		label:"Customer name: "
	},
	{
		name:"email",
		label:"Email: "
	},
	{
		name:"phone",
		label:"Phone: "
	},
	{
		name:"tableSize",
		label:"Party size (chairs): "
	},
]
const bookingInfo = [
	{
		name:"tableId",
		label:"Table id: "
	},
	{
		name:"tableSize",
		label:"Table size: "
	},
	{
		name:"reservationDate",
		label:"Booking date: "
	},
	{
		name:"reservationTime",
		label:"Booking time: "
	},
]