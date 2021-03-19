import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
	list: {
		border: "2px solid #8282828a",
	},

	category: {
		fontSize: "1rem",
		fontWeight: "bold",
		padding: "1vh 1vw",
	},
});

export default function CategoriesList({
	categories,
	selectedCategoryId,
	setSelectedCategoryId,
}) {
	const classes = useStyles();

	return (
		<List className={classes.list} disablePadding>
			<ListItem
				key="0"
				button
				autoFocus
				disableGutters
				selected={selectedCategoryId === "0"}
				className={classes.category}
				onClick={() => setSelectedCategoryId("0")}>
				Todas
			</ListItem>
			{categories.map(category => (
				<ListItem
					key={category.id}
					button
					disableGutters
					selected={selectedCategoryId === category.id}
					className={classes.category}
					onClick={() => setSelectedCategoryId(category.id)}>
					{category.desc}
				</ListItem>
			))}
		</List>
	);
}
