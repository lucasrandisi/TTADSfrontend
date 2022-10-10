import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { addMonths } from "date-fns";

import DayPicker from "react-day-picker";
import MomentLocaleUtils from "react-day-picker/moment";
import "react-day-picker/lib/style.css";

import { Grid } from "@material-ui/core";

import { GET_RESERVATIONS_TABLES } from "../queries/ReservationQuery";
import "moment/locale/es";

const modifiersStyles = {
	selected: {
		color: "white",
		backgroundColor: "#ffc107",
	},
	reserved: {
		color: "#ffc107",
		backgroundColor: "#fffdee",
	},
	outside: {
		backgroundColor: "white",
	},
};

export default function CalendarReservations({
	partySize,
	reservationDate,
	setReservationDate,
}) {
	const [invalid, setInvalid] = useState(false);

	const { loading, error, data } = useQuery(GET_RESERVATIONS_TABLES, {
		variables: { size: partySize },
	});

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error! {error.message}</p>;

	const reservedDates = data.reservationsBySize;

	if (!reservedDates.length) {
		return <p>There are no tables available because the size is too large</p>;
	}

	const handleDayChange = (value, modifiers) => {
		if (modifiers.disabled) {
			setInvalid(true);
		} else {
			setInvalid(false);
			setReservationDate(value);
		}
	};

	const reserved = reservedDates.map(r => new Date(r));

	const modifiers = {
		disabled: [...reserved, { daysOfWeek: [1,2,3] }, { before: new Date() }],
		reserved,
		selected: reservationDate,
	};

	return (
		<>
			<Grid container justify="center">
				<DayPicker
					numberOfMonths={2}
					selectedDays={reservationDate}
					onDayClick={handleDayChange}
					modifiers={modifiers}
					modifiersStyles={modifiersStyles}
					month={new Date()}
					fromMonth={new Date()}
					toMonth={new Date(addMonths(new Date(), 3))}
					locale="es-AR"
					localeUtils={MomentLocaleUtils}
				/>
			</Grid>
			<p>
				{!reservationDate && !invalid && "Please select a day 👻"}
				{invalid && "Invalid date!"}
			</p>
		</>
	);
}
