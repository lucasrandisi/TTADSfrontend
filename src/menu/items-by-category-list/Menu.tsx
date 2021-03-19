import React, { useContext, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { ThemeContext } from "styled-components";
import { useQuery } from "@apollo/client";

import GET_CATEGORIES_AND_ITEMS from "../queries/get-categories-and-items.query";
import CategoriesList from "./CategoriesList";
import ItemsList from "./ItemsList";
import useDefaultClasses from 'styles/classes';


const useClasses = makeStyles({
	flex: {
		display: "flex"
	},

	sectionTitle: {
		fontSize: "1.2rem",
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
	const classes = useClasses(theme);
	const defaultClasses = useDefaultClasses(theme);

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
		<div className={defaultClasses.main}>
			<h1 className={defaultClasses.mainTitle}>Menu</h1>

			<div className={`${defaultClasses.content} ${classes.flex}`}>
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
