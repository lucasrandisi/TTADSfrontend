import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import Tooltip from "@material-ui/core/Tooltip";
import React from "react";

const useStyles = makeStyles({
	tableRow: {
		height: "3vh",
		borderBottom: "2px solid #bdb5b58a",
	},

	tableCell: {
		fontSize: "1.2rem",
		padding: "0 1vw",
	},

	header: {
		fontWeight: "bold",
		padding: "0 1vw 1vh",
	},

	// Title
	titleCell: {
		width: "30%",
		paddingLeft: 0,
	},

	// Desc
	descCell: {
		width: "40%",
	},

	// Servings, Price, Actions
	shortCell: {
		width: "4%",

		// Actions
		"&:last-of-type": {
			width: "12%",
		},
	},
});

export default function DishesList({ dishes }) {
	const classes = useStyles();

	return (
		<Table aria-label="table">
			<TableHead>
				<TableRow className={classes.tableRow}>
					<TableCell
						className={`${classes.tableCell} ${classes.header} ${classes.titleCell}`}>
						Title
					</TableCell>
					<TableCell
						className={`${classes.tableCell} ${classes.header} ${classes.descCell}`}>
						Description
					</TableCell>
					<TableCell
						className={`${classes.tableCell} ${classes.header} ${classes.shortCell}`}>
						Servings
					</TableCell>
					<TableCell
						className={`${classes.tableCell} ${classes.header} ${classes.shortCell}`}>
						Price
					</TableCell>
					<TableCell
						className={`${classes.tableCell} ${classes.header} ${classes.shortCell}`}>
						Actions
					</TableCell>
				</TableRow>
			</TableHead>
			<TableBody>
				{dishes.map(dish => (
					<TableRow key={dish.id} className={classes.tableRow}>
						<TableCell
							padding="none"
							className={`${classes.tableCell} ${classes.titleCell}`}>
							{dish.title}
						</TableCell>
						<TableCell
							padding="none"
							className={`${classes.tableCell} ${classes.descCell}`}>
							{dish.desc}
						</TableCell>
						<TableCell
							padding="none"
							className={`${classes.tableCell} ${classes.shortCell}`}>
							{dish.servings}
						</TableCell>
						<TableCell
							padding="none"
							className={`${classes.tableCell} ${classes.shortCell}`}>
							${dish.pricePerUnit}
						</TableCell>
						<TableCell
							padding="none"
							className={`${classes.tableCell} ${classes.shortCell}`}>
							<Tooltip title="Edit">
								<IconButton aria-label="edit">
									<EditIcon />
								</IconButton>
							</Tooltip>
							<Tooltip title="Remove from category">
								<IconButton aria-label="delete">
									<DeleteIcon />
								</IconButton>
							</Tooltip>
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
}
