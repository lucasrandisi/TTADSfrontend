import React, { useState } from "react";
import {
	Table,
	TableBody,
	TableContainer,
	Paper,
	Grid,
	TableCell,
	TableHead,
	TableRow,
	TableSortLabel,
	TablePagination,
} from "@material-ui/core";

import ReservationTableRow from "./ReservationTableRow";
import { TableToolbar } from "./TableToolbar";

const columns = [
	{ id: "info", label: "More", sortable: false, width: 70 },
	{ id: "state", label: "State", sortable: false, width: 130 },
	{ id: "date", label: "Date", sortable: true, width: 90 },
	{ id: "time", label: "Time", sortable: true, width: 90 },
	{ id: "firstName", label: "Customer name", sortable: true, width: 130 },
	{ id: "partySize", label: "Seats", sortable: true, width: 90 },
	{ id: "delete", label: "Delete", sortable: false, width: 90 },
	{ id: "edit", label: "Edit", sortable: false, width: 90 },
];

function descendingComparator(a, b, orderBy) {
	if (b[orderBy] < a[orderBy]) {
		return -1;
	}
	if (b[orderBy] > a[orderBy]) {
		return 1;
	}
	return 0;
}

function getComparator(order, orderBy) {
	return order === "desc"
		? (a, b) => descendingComparator(a, b, orderBy)
		: (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
	const stabilizedThis = array.map((el, index) => [el, index]);
	stabilizedThis.sort((a, b) => {
		const order = comparator(a[0], b[0]);
		if (order !== 0) return order;
		return a[1] - b[1];
	});
	return stabilizedThis.map(el => el[0]);
}

type Order = "asc" | "desc";
interface Data {
	partySize: number;
	customerName: string;
	reservationDateTime: Date;
}

export default function ReservationTable({ reservations }) {
	// Filters
	const [searchInput, setSearchInput] = useState("");
	const [from, setFrom] = useState<Date | undefined>();
	const [to, setTo] = useState<Date | undefined>();

	// Sort
	const [order, setOrder] = useState<Order>("asc");
	const [orderBy, setOrderBy] = useState<keyof Data | undefined>();

	// Pagination
	const [page, setPage] = React.useState(0);
	const [rowsPerPage, setRowsPerPage] = React.useState(5);

	const handleRequestSort = (event, property) => {
		const isAsc = orderBy === property && order === "asc";
		setOrder(isAsc ? "desc" : "asc");
		setOrderBy(property);
	};

	const createSortHandler = property => event => {
		// onRequestSort(event, property);
		handleRequestSort(event, property);
	};

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = event => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	const handleResetFliters = () => {
		setFrom(undefined);
		setTo(undefined);
		setSearchInput("");
	};

	let rows = reservations;
	if (to && from) {
		rows = rows.filter(
			r =>
				r?.reservationDateTime <= to.toISOString() &&
				r?.reservationDateTime >= from.toISOString()
		);
		// TODO setPage(0);
	}
	if (searchInput) {
		rows = rows.filter(r =>
			r?.customerName.toLowerCase().includes(searchInput.toLowerCase())
		);
	}

	const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

	return (
		<Grid item xs={12}>
			<Paper>
				<TableToolbar
					searchInput={searchInput}
					setSearchInput={setSearchInput}
					from={from}
					setFrom={setFrom}
					to={to}
					setTo={setTo}
					handleResetFliters={handleResetFliters}
				/>
				<TableContainer>
					<Table size="small" aria-label="reservation table">
						<TableHead>
							<TableRow>
								{columns.map(headCell => (
									<TableCell
										key={headCell.id}
										// align={headCell.numeric ? "right" : "left"}
										// padding={headCell.disablePadding ? "none" : "default"}
										sortDirection={orderBy === headCell.id ? order : false}>
										<TableSortLabel
											active={orderBy === headCell.id}
											direction={orderBy === headCell.id ? order : undefined}
											onClick={createSortHandler(headCell.id)}
											disabled={!headCell.sortable}>
											{headCell.label}
										</TableSortLabel>
									</TableCell>
								))}
							</TableRow>
						</TableHead>

						<TableBody>
							{stableSort(rows, getComparator(order, orderBy))
								.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
								.map(res => (
									<ReservationTableRow res={res} key={res.id} />
								))}

							{emptyRows > 0 && (
								<TableRow style={{ height: 60 * emptyRows }}>
									<TableCell colSpan={6} />
								</TableRow>
							)}
						</TableBody>
					</Table>
				</TableContainer>

				<TablePagination
					rowsPerPageOptions={[5, 10, 25]}
					component="div"
					count={rows.length}
					rowsPerPage={rowsPerPage}
					page={page}
					onChangePage={handleChangePage}
					onChangeRowsPerPage={handleChangeRowsPerPage}
				/>
			</Paper>
		</Grid>
	);
}
