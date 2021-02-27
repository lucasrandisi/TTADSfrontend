import React, { useContext, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { ThemeContext } from "styled-components";
import { useQuery } from "@apollo/client";

import GET_CATEGORIES_AND_ITEMS from "./queries/categories-and-items.query";
import CategoriesList from "./CategoriesList";
import ItemsList from "./ItemsList";

const useStyles = makeStyles({
	main: {
		padding: "2vh 4vw",

		"@media (min-width: 1366px)": {
			padding: "4vh 3vw",
		},
	},

	mainTitle: {
		color: (props: any) => props.color1,
		fontSize: "2rem",

		"@media (min-width: 1366px)": {
			fontSize: "3rem",
		},
	},

	content: {
		marginTop: "2vh",
		display: "flex",

		"@media (min-width: 1366px)": {
			marginTop: "4vh",
		},
	},

	sectionTitle: {
		fontSize: "1.5ren",
		marginBottom: "1vh",
	},

	categoryListSection: {
		width: "15%",
		marginRight: "5%",
	},

	itemsTableSection: {
		flexGrow: 1,
	},
});

const Menu: React.FC = () => {
	const [selectedCategoryId, setSelectedCategoryId] = useState("0");
	const { loading, error, data } = useQuery(GET_CATEGORIES_AND_ITEMS);

	const theme = useContext(ThemeContext);
	const classes = useStyles(theme);

	if (loading) return <p>Loading...</p>;
	if (error) return <p>ERROR: {error.message}</p>;

	// Cargar items según la categoría seleccionada
	let items = [];

	if (selectedCategoryId === "0") {
		items = data.items;
	} else {
		items = data.items.filter(item =>
			item.categories.some(category => category.id === selectedCategoryId)
		);
	}

	return (
		<div className={classes.main}>
			<h1 className={classes.mainTitle}>Menu</h1>

			<div className={classes.content}>
				<div className={classes.categoryListSection}>
					<h2 className={classes.sectionTitle}>Categories</h2>
					<CategoriesList
						categories={data.categories}
						selectedCategoryId={selectedCategoryId}
						setSelectedCategoryId={setSelectedCategoryId}
					/>
				</div>

				<div className={classes.itemsTableSection}>
					<h2 className={classes.sectionTitle}>Dishes</h2>
					<ItemsList selectedCategoryId={selectedCategoryId} items={items} />
				</div>
			</div>
		</div>
	);
};

export default Menu;
