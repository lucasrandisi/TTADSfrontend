import React, { useEffect } from "react";
import styled from "styled-components";
import moment from "moment";
import { Link } from "react-router-dom";
import { TableInterface } from "../models/table.model";
import ListAlt from '@material-ui/icons/ListAlt';
import EventBusy from '@material-ui/icons/EventBusy';
import Add from '@material-ui/icons/Add';

export default function Table(props) {
	const { table }: { table: TableInterface } = props;
	let timer: string = "";

	useEffect(() => {
		const dateTimer = setTimeout(() => null, 1000 * 60);

		return () => clearTimeout(dateTimer);
	});
	
	if (table.currentOrder) {		
		const timeDifference = moment().diff(moment(table.currentOrder.createdAt));
		timer = `${moment(timeDifference).format('H:mm')}`;

	} else if (table.nextReservation) {
		const reservationTime = moment(table.nextReservation.reservationDateTime);
		timer = `${reservationTime.utc().format('HH:mm')}`;
	}

	return (
		<TableLink to={`table/${table.id}/${table.nextReservation?.id}`}>
		<div className="container">
			<div				
				className="table-container table-container-left"
			>{table.id}</div>
			<StateTable table={table} className="table-container table-container-icon">
				{(table.currentOrder) && <ListAlt />}
				{(table.nextReservation) && <EventBusy />}
				{!(table.nextReservation) && !(table.currentOrder) && <Add />}
				
			</StateTable>
			<div className="table-container table-container-time">
				{(table.nextReservation) && <StyleP>Booking at <br></br> {timer} hr</StyleP>}
				{(table.currentOrder) && <StyleP>Duration <br></br>{timer} hr</StyleP>}
				{!(table.nextReservation) && !(table.currentOrder) && 
					<StyleP className="available">Available</StyleP>}
			</div>
			<StateTable table={table} className="table-container table-container-right">
				{(table.nextReservation) && <StyleP>Customer name: {table.nextReservation.customerName}</StyleP>}				
			</StateTable>
		</div>
		</TableLink>
	);
} 

const StyleP = styled.p`
	font-family: 'Poppins';
	font-size: 13px;
`
const StateTable = styled.div`
	background-color: ${props => {
		if (props.table.currentOrder) {
			return props.theme.with_order;
		}
		if (props.table.nextReservation) {
			return props.theme.with_reservation;
		}
		return props.theme.available;
	}};
`;

const TableLink = styled(Link)`
	text-decoration: none;
	&:hover {
		color: green;
		cursor: pointer;
	}
	color: black;
`;