import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import CloseIcon from "@material-ui/icons/Close";
import EditIcon from "@material-ui/icons/Edit";
import Tooltip from "@material-ui/core/Tooltip";
import React from "react";
import { useMutation } from "@apollo/client";
import { Link, useRouteMatch } from "react-router-dom";

import UPDATE_ITEM from "../queries/update-item";

const useStyles = makeStyles({
	tableRow: {
		height: "3vh",
		borderBottom: "2px solid #bdb5b58a",
	},

	tableCell: {
		fontSize: "1rem",
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

	// Servings, Price
	shortCell: {
		width: "4%",
	},

	// Actions
	actionsCell: {
		display: "flex",
		justifyContent: "center",
	},

	button: {
		padding: "6px",
	},
});

export default function ItemsList({ selectedCategoryId, items }) {
	/* eslint no-use-before-define: ["error", { "functions": false }] */
	const [removeCategoryFromItem] = useMutation(UPDATE_ITEM);
	const classes = useStyles();
	const { url } = useRouteMatch();

	function removeSelectedCategoryFromItem(targetItem) {
		const filteredCategoriesId = targetItem.categories
			.filter(category => category.id !== selectedCategoryId)
			.map(category => category.id);

		removeCategoryFromItem({
			variables: {
				id: targetItem.id,
				itemInput: {
					categoriesId: filteredCategoriesId,
				},
			},
			update: (cache, result) => 
				updateCacheAfterCategoryRemovedFromItem(cache, result, targetItem),
		});
	}

	function updateCacheAfterCategoryRemovedFromItem(cache, result, targetItem) {
		if (result) {
			cache.modify({
				id: cache.identify(targetItem),
				fields: {
					categories: () => result.categories,
				},
			});
		}
	}

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
				{items.map(item => (
					<TableRow key={item.id} className={classes.tableRow}>
						<TableCell
							padding="none"
							className={`${classes.tableCell} ${classes.titleCell}`}>
							{item.title}
						</TableCell>
						<TableCell
							padding="none"
							className={`${classes.tableCell} ${classes.descCell}`}>
							{item.desc}
						</TableCell>
						<TableCell
							padding="none"
							className={`${classes.tableCell} ${classes.shortCell}`}>
							{item.servings}
						</TableCell>
						<TableCell
							padding="none"
							className={`${classes.tableCell} ${classes.shortCell}`}>
							${item.pricePerUnit}
						</TableCell>
						<TableCell className={`${classes.tableCell} ${classes.actionsCell}`}>
							{selectedCategoryId === "0" ? (
								<Link to={`${url}/items/${item.id}`}>
									<Tooltip title="Edit">
										<IconButton className={classes.button} aria-label="edit">
											<EditIcon />
										</IconButton>
									</Tooltip>
								</Link>
							) : (
								<Tooltip title="Remove from category">
									<IconButton
										className={classes.button}
										aria-label="delete"
										onClick={() => removeSelectedCategoryFromItem(item)}>
										<CloseIcon />
									</IconButton>
								</Tooltip>
							)}
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
}
