import React, { useState } from "react";
import styled from "styled-components";

import { IconButton, InputBase, Toolbar, Tooltip } from "@material-ui/core";
import FilterListIcon from "@material-ui/icons/FilterList";
import ClearRoundedIcon from "@material-ui/icons/ClearRounded";
import SearchIcon from "@material-ui/icons/Search";

import { DatePickerInput } from "common/DatePickerInput";

export const TableToolbar = ({
	searchInput,
	setSearchInput,
	from,
	setFrom,
	to,
	setTo,
	handleResetFliters,
}) => {
	const [focused, setFocused] = useState(false);
	return (
		<StyledToolbar>
			<QuickFilters>
				<SearchBar
					name="searchBar"
					placeholder="Search"
					autoComplete="off"
					endAdornment={
						<IconButton aria-label="search">
							<SearchIcon />
						</IconButton>
					}
					onFocus={setFocused}
					onBlur={() => setFocused(false)}
					focused={focused}
					value={searchInput}
					onChange={e => setSearchInput(e.target.value)}
				/>

				<DatePickerInput from={from} setFrom={setFrom} to={to} setTo={setTo} />
			</QuickFilters>

			<div>
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
			</div>
		</StyledToolbar>
	);
};

const StyledToolbar = styled(Toolbar)`
	justify-content: space-between;
`;

const QuickFilters = styled.div`
	display: grid;
	grid-auto-flow: column;
	grid-column-gap: 26px;
	align-items: baseline;
`;

const SearchBar = styled(InputBase)`
	border-radius: 5px;
	background-color: #f1f3f5;
	padding-inline: 10px;
	border: none;

	transition: all 0.2s ease-in-out;
	width: ${props => (props.focused ? "400px" : "200px")};
`;
