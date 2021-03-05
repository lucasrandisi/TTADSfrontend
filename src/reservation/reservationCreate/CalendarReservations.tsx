import React from "react";
import { useQuery } from "@apollo/client";
import styled from "styled-components";
import Calendar from "react-calendar";
import moment from "moment";
import "react-calendar/dist/Calendar.css";

import Box from "@material-ui/core/Box";
import { GET_RESERVATIONS_TABLES } from "../queries/ReservationQuery";

export default function CalendarReservations({
	partySize,
	reservationDate,
	setReservationDate,
}) {
	const { loading, error, data } = useQuery(GET_RESERVATIONS_TABLES, {
		variables: { size: partySize },
	});

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error! {error.message}</p>;

	const reservedDates = data.reservationsBySize;

	if (!reservedDates.length) {
		return <p>There are no tables available because the size is too large</p>;
	}

	const isReserved = date =>
		reservedDates.find(reservedDate => moment(reservedDate).isSame(date, "date"));

	function tileClassName({ date }) {
		if (!reservedDates.includes("available") && isReserved(date)) {
			return "reserved";
		}

		return null;
	}

	const handleChangeEvent = (value, event) => {
		if (isReserved(value)) {
			event.preventDefault();
		} else {
			setReservationDate(value);
		}
	};

	return (
		<Box paddingBottom={2}>
			<StyledCalendar
				minDetail="month"
				minDate={new Date()}
				maxDate={moment().add(1, "M").toDate()}
				tileClassName={tileClassName}
				value={reservationDate}
				onChange={handleChangeEvent}
			/>
		</Box>
	);
}

const StyledCalendar = styled(Calendar)`
	&& {
		width: 70%;
		margin-left: auto;
		margin-right: auto;
		.reserved {
			background-color: #d45f5f;

			&:hover {
				background-color: #b53535;
			}
		}

		.react-calendar__navigation {
			height: 6.6vh;
			margin: 0;

			button {
				font-size: 0.6rem;

				@media (min-width: ${props => props.theme.md}) {
					font-size: 1.13rem;
				}

				@media (min-width: ${props => props.theme.xl}) {
					font-size: 1.53rem;
				}
			}
		}

		.react-calendar__month-view__weekdays {
			height: 5.3vh;
			align-items: center;

			.react-calendar__month-view__weekdays__weekday {
				@media (min-width: ${props => props.theme.md}) {
					font-size: 0.6rem;
				}

				@media (min-width: ${props => props.theme.xl}) {
					font-size: 1.06rem;
				}
			}
		}

		.react-calendar__month-view__days {
			@media (min-width: ${props => props.theme.md}) {
				height: 25.3vh;
			}

			@media (min-width: ${props => props.theme.lg}) {
				height: 43.3vh;
			}

			.react-calendar__tile {
				@media (min-width: ${props => props.theme.md}) {
					font-size: 0.7rem;
				}

				@media (min-width: ${props => props.theme.lg}) {
					font-size: 0.9rem;
				}

				@media (min-width: ${props => props.theme.xl}) {
					font-size: 1.2rem;
				}
			}
		}
	}
`;
