import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Redirect, useRouteMatch } from "react-router-dom";
import { TableInterface } from "../models/table.model";

export default function Table(props) {
	const { table }: { table: TableInterface } = props;
	const [now, setNow] = useState(Date.now());
	const [redirect, setRedirect] = useState(false);
	const { url } = useRouteMatch();
	let timer: string = "";

	useEffect(() => {
		const dateTimer = setTimeout(() => {
			setNow(Date.now());
		}, 1000);

		return () => clearTimeout(dateTimer);
	});

	if (table.currentOrder) {
		const orderTime = new Date(table.currentOrder.createdAt);
		const timeDifference = new Date(now - orderTime.getTime());

		const hours = timeDifference.getHours().toString().padStart(2, "0");
		const minutes = timeDifference.getMinutes().toString().padStart(2, "0");
		const seconds = timeDifference.getSeconds().toString().padStart(2, "0");

		timer = `${hours} : ${minutes} : ${seconds}`;
	} else if (table.nextReservation) {
		const reservationTime = new Date(table.nextReservation.reservationDateTime);

		const hours = reservationTime.getUTCHours().toString().padStart(2, "0");
		const minutes = reservationTime.getMinutes().toString().padStart(2, "0");
		const seconds = reservationTime.getSeconds().toString().padStart(2, "0");

		timer = `${hours} : ${minutes} : ${seconds}`;
	}

	if (redirect) {
		return <Redirect to={`${url}/${table.id}`} />;
	}

	return (
		<Box
			open={table.currentOrder}
			reserved={table.nextReservation}
			onClick={() => setRedirect(true)}>
			<span>Table {table.id}</span>
			{(table.currentOrder || table.nextReservation) && <span>{timer}</span>}
		</Box>
	);
}

const Box = styled.div`
	width: 30%;
	height: 10vh;
	margin: 0 1% 3vh;
	background-color: ${props => {
		if (props.open) {
			return props.theme.color3;
		}
		if (props.reserved) {
			return props.theme.color5;
		}

		return props.theme.color4;
	}};
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	align-content: center;

	@media (min-width: ${props => props.theme.md}) {
		width: 25%;
		height: 7vh;
		font-size: 1.2rem;
	}

	@media (min-width: ${props => props.theme.lg}) {
		width: 13%;
		height: 8vh;
	}

	@media (min-width: ${props => props.theme.xl}) {
		width: 10%;
		height: 7vh;
	}

	&: hover {
		border: 1px solid black;
		cursor: pointer;
	}

	span {
		font-weight: 700;
		color: ${props => (props.open ? props.theme.color4 : props.theme.color1)};
	}
`;
