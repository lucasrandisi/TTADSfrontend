import React from "react";
import styled from "styled-components";

import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import { ClearRounded } from "@material-ui/icons";

import { DatePickerInput } from "common/DatePickerInput";

const useStyles = makeStyles(theme => ({
	root: {
		display: "flex",
		alignItems: "center",
		width: 500,
		marginLeft: "10px",
	},
	input: {
		marginLeft: theme.spacing(1),
		flex: 1,
	},
	iconButton: {
		padding: 10,
	},
}));

export default function ReservationFilters({
	searchInput,
	setSearchInput,
	from,
	setFrom,
	to,
	setTo,
	onReset,
}) {
	const classes = useStyles();

	return (
		<>
			<Paper component="form" className={classes.root}>
				<InputBase
					name="searchBar"
					className={classes.input}
					placeholder="Filter..."
					value={searchInput}
					onChange={e => setSearchInput(e.target.value)}
				/>
				<IconButton className={classes.iconButton} aria-label="search">
					<SearchIcon />
				</IconButton>

				<DatePickerInput from={from} setFrom={setFrom} to={to} setTo={setTo} />

				<ClearFilterButton onClick={onReset} type="button">
					<ClearRounded fontSize="small" />
				</ClearFilterButton>
			</Paper>
		</>
	);
}

const ClearFilterButton = styled.button`
	background-color: transparent;
	display: inline-block;
	cursor: pointer;
	border: none;
	outline: none;
	text-decoration: none;
`;
