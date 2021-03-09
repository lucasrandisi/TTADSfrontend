import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";

const useStyles = makeStyles(theme => ({
	root: {
		display: "flex",
		alignItems: "center",
		width: 300,
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

export default function ReservationFilters({ searchInput, setSearchInput }) {
	const classes = useStyles();
	return (
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
		</Paper>
	);
}
