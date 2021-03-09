import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Pagination from "@material-ui/lab/Pagination";

const useStyles = makeStyles(theme => ({
	root: {
		"& > * + *": {
			marginTop: theme.spacing(2),
		},
	},
	pag: {},
}));

export default function ReservationPagination({
	lenReservations,
	page,
	currentPage,
	setCurrentPage,
}) {
	const classes = useStyles();
	const pageNumber = Math.ceil(lenReservations / page);

	const handleChange = (event, value) => {
		setCurrentPage(value);
	};

	return (
		<div className={classes.root}>
			<Pagination
				className={classes.pag}
				count={pageNumber}
				page={currentPage}
				onChange={handleChange}
				variant="outlined"
				shape="rounded"
			/>
		</div>
	);
}
