import React, { useState } from "react";
import styled from "styled-components";
import "moment/locale/es";
import { endOfWeek, startOfWeek } from "date-fns";

import DayPicker from "react-day-picker/DayPicker";
import { DateUtils } from "react-day-picker";
import MomentLocaleUtils from "react-day-picker/moment";
import "react-day-picker/lib/style.css";

import { Button, Input } from "@material-ui/core";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";

import useComponentVisible from "utils/useComponentVisible";

export const DatePickerInput = ({ from, setFrom, to, setTo }) => {
	// Keep track of the last day for mouseEnter.
	const [enteredTo, setEnteredTo] = useState<Date | undefined>();

	const { ref, isComponentVisible, setIsComponentVisible } = useComponentVisible(false);

	const toggleDatepicker = () => {
		setIsComponentVisible(true);
	};

	const isSelectingFirstDay = day => {
		const isBeforeFirstDay = from && DateUtils.isDayBefore(day, from);
		const isRangeSelected = from && to;
		return !from || isBeforeFirstDay || isRangeSelected;
	};

	const handleDayClick = day => {
		if (isSelectingFirstDay(day)) {
			setFrom(day);
			setEnteredTo(undefined);
			setTo(undefined);
		} else {
			setTo(day);
			setEnteredTo(day);
		}
	};

	const handleDayMouseEnter = day => {
		if (!isSelectingFirstDay(day)) {
			setEnteredTo(day);
		}
	};

	const selectToday = () => {
		setFrom(new Date());
		setTo(new Date());
		setIsComponentVisible(false);
	};

	const selectThisWeek = () => {
		const today = new Date();
		setFrom(startOfWeek(today));
		setTo(endOfWeek(today));
		setIsComponentVisible(false);
	};

	const resetDate = () => {
		setFrom(undefined)
		setTo(undefined);
	}
	return (
		<FromToInput>
			<DatePickerInputGroup>
				<Input
					value={from ? from.toLocaleDateString() : ""}
					placeholder="From"
					readOnly
					onClick={toggleDatepicker}
				/>
				<ChevronRightIcon />
				<Input
					value={to ? to.toLocaleDateString() : ""}
					placeholder="To"
					readOnly
					onClick={toggleDatepicker}
				/>
				<Button onClick={resetDate}>reset</Button>
			</DatePickerInputGroup>

			<DayPickerSelector ref={ref}>
				{isComponentVisible && (
					<>
						<DayPicker
							className="Range"
							numberOfMonths={2}
							selectedDays={[from, { from, to: enteredTo }]}
							modifiers={{ start: from, end: to }}
							initialMonth={new Date()}
							onDayClick={handleDayClick}
							onDayMouseEnter={handleDayMouseEnter}
							locale="es-AR"
							localeUtils={MomentLocaleUtils}
						/>
						<DayPickerFooter>
							<Button color="primary" onClick={selectToday}>
								Today
							</Button>
							<Button color="primary" onClick={selectThisWeek}>
								This week
							</Button>
						</DayPickerFooter>
					</>
				)}
			</DayPickerSelector>
		</FromToInput>
	);
};

const FromToInput = styled.div`
	width: 13rem;
`;

const DatePickerInputGroup = styled.div`
	display: grid;
	grid-row-gap: 3px;
	grid-auto-flow: column;
	grid-gap: 6px;

	align-items: center;
	position: relative;
	width: 100%;
	overflow: hidden;
`;

const DayPickerFooter = styled.div`
	display: grid;
	grid-auto-flow: column;
	padding-block-end: 0.5rem;
`;

const DayPickerSelector = styled.div`
	position: absolute;
	background-color: white;
	z-index: 10;
	outline-offset: 100px;
	border: none;
	padding: 2px;
	transform: none !important;

	.DayPicker-Day--selected:not(.DayPicker-Day--start):not(.DayPicker-Day--end):not(.DayPicker-Day--outside) {
		background-color: #f0f8ff !important;
		color: #4a90e2;
	}
	.DayPicker-Day {
		border-radius: 0 !important;
	}

	.DayPicker-Day--start {
		border-radius: 50% !important;

		&:before {
			content: "";
			position: absolute;
			z-index: -1;
			top: 0;
			left: 50%;
			bottom: 0;
			right: 0;
			background: #f0f8ff;
		}
	}
	.DayPicker-Day--end {
		border-radius: 50% !important;

		&:before {
			content: "";
			position: absolute;
			z-index: -1;
			top: 0;
			left: 0;
			bottom: 0;
			right: 50%;
			background: #f0f8ff;
		}
	}
`;
