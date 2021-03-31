import React from "react";

import { IconButton, InputBase, makeStyles, Toolbar, Tooltip } from "@material-ui/core";
import FilterListIcon from "@material-ui/icons/FilterList";
import ClearRoundedIcon from "@material-ui/icons/ClearRounded";
import SearchIcon from "@material-ui/icons/Search";

import { DatePickerInput } from "common/DatePickerInput";

const useStyles = makeStyles(theme => ({
	input: {
		marginLeft: theme.spacing(1),
		flex: 1,
	},
}));

export const TableToolbar = ({
	searchInput,
	setSearchInput,
	from,
	setFrom,
	to,
	setTo,
	handleResetFliters,
}) => {
	const classes = useStyles();
	return (
		<Toolbar>
			<InputBase
				name="searchBar"
				className={classes.input}
				placeholder="Filter..."
				value={searchInput}
				onChange={e => setSearchInput(e.target.value)}
			/>
			<IconButton aria-label="search">
				<SearchIcon />
			</IconButton>

			<DatePickerInput from={from} setFrom={setFrom} to={to} setTo={setTo} />

			<Tooltip onClick={handleResetFliters} title="Clear filters">
				<IconButton aria-label="clear filters">
					<ClearRoundedIcon fontSize="small" />
				</IconButton>
			</Tooltip>

			<Tooltip title="Filter list">
				<IconButton aria-label="filter list">
					<FilterListIcon />
				</IconButton>
			</Tooltip>
		</Toolbar>
	);
};
