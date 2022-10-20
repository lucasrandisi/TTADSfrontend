import React, { useState } from "react";
import { addMonths } from "date-fns";

import DayPicker from "react-day-picker";
import MomentLocaleUtils from "react-day-picker/moment";
import "react-day-picker/lib/style.css";

import { Grid } from "@material-ui/core";

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

	const handleDayChange = (value, modifiers) => {
		if (modifiers.disabled) {
			setInvalid(true);
		} else {
			setInvalid(false);
			setReservationDate(value);
		}
	};
	const modifiers = {
		disabled: [{ daysOfWeek: [6,0] }, { before: new Date() }],
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
				{!reservationDate && !invalid && "Please select a day"}
				{invalid && "Invalid date!"}
			</p>
		</>
	);
}
