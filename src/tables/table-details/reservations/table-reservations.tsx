import React from "react";
import { useQuery } from "@apollo/client";
import styled from "styled-components";
import Calendar from "react-calendar";
import moment from "moment";
import { useParams } from "react-router-dom";
import "react-calendar/dist/Calendar.css";

import { GET_TABLE_RESERVATIONS } from "../../queries/tables.query";

export function TableReservations() {
	const { tableId } = useParams();
	const { loading, error, data } = useQuery(GET_TABLE_RESERVATIONS, {
		variables: { tableId },
	});
	const reservedDates: Date[] = [];

	if (loading) return "Loading...";
	if (error) return `Error! ${error.message}`;

	// eslint-disable-next-line no-restricted-syntax
	for (const reservation of data.table.reservations) {
		reservedDates.push(reservation.reservationDateTime);
	}
	function tileClassName({ date }) {
		if (reservedDates.find(reservedDate => moment(reservedDate).isSame(date, "date"))) {
			return "reserved";
		}

		return null;
	}

	return (
		<StyledCalendar
			minDetail="month"
			minDate={new Date()}
			maxDate={moment().add(1, "M").toDate()}
			tileClassName={tileClassName}
		/>
	);
}

const StyledCalendar = styled(Calendar)`
	&& {
		width: 100%;

		.reserved {
			background-color: #d45f5f;

			&:hover {
				background-color: #b53535;
			}
		}

		.react-calendar__navigation {
			height: 10vh;
			margin: 0;

			button {
				font-size: 1rem;

				@media (min-width: ${props => props.theme.md}) {
					font-size: 1.7rem;
				}

				@media (min-width: ${props => props.theme.xl}) {
					font-size: 2.3rem;
				}
			}
		}

		.react-calendar__month-view__weekdays {
			height: 8vh;
			align-items: center;

			.react-calendar__month-view__weekdays__weekday {
				@media (min-width: ${props => props.theme.md}) {
					font-size: 1rem;
				}

				@media (min-width: ${props => props.theme.xl}) {
					font-size: 1.6rem;
				}
			}
		}

		.react-calendar__month-view__days {
			@media (min-width: ${props => props.theme.md}) {
				height: 38vh;
			}

			@media (min-width: ${props => props.theme.lg}) {
				height: 65vh;
			}

			.react-calendar__tile {
				@media (min-width: ${props => props.theme.md}) {
					font-size: 1.2rem;
				}

				@media (min-width: ${props => props.theme.lg}) {
					font-size: 1.5rem;
				}

				@media (min-width: ${props => props.theme.xl}) {
					font-size: 2rem;
				}
			}
		}
	}
`;

export default TableReservations as React.FC;
