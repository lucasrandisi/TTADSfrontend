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

import REMOVE_ITEM_FROM_CATEGORY from "./queries/remove-item-from-category.query";

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
	const [removeCategoryFromItem] = useMutation(REMOVE_ITEM_FROM_CATEGORY, {
		update: updateCacheAfterCategoryRemovedFromItem,
	});
	const classes = useStyles();
	let itemToRemoveCategoryFrom;

	function removeSelectedCategoryFromItem(targetItem) {
		removeCategoryFromItem({
			variables: {
				id: selectedCategoryId,
				itemId: targetItem.id,
			},
		});

		itemToRemoveCategoryFrom = targetItem;
	}

	function updateCacheAfterCategoryRemovedFromItem(cache) {
		cache.modify({
			id: cache.identify(itemToRemoveCategoryFrom),
			fields: {
				categories(prevCategories, { readField }) {
					return prevCategories.filter(
						category => selectedCategoryId !== readField("id", category)
					);
				},
			},
		});
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
								<Tooltip title="Edit">
									<IconButton className={classes.button} aria-label="edit">
										<EditIcon />
									</IconButton>
								</Tooltip>
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
