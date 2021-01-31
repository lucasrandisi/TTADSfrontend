import React, { useContext, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { ThemeContext } from "styled-components";

import { useQuery } from "@apollo/client";
import GET_CATEGORIES_AND_DISHES from "./queries/categories-and-dishes.query";
import CategoriesList from "./CategoriesList";
import DishesList from "./DishesList";

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

	dishesTableSection: {
		flexGrow: 1,
	},
});

const Menu: React.FC = () => {
	const [selectedCategoryId, setSelectedCategoryId] = useState(0);
	const { loading, error, data } = useQuery(GET_CATEGORIES_AND_DISHES);

	const theme = useContext(ThemeContext);
	const classes = useStyles(theme);

	if (loading) return <p>Loading...</p>;
	if (error) return <p>ERROR: {error.message}</p>;

	let dishes = [];

	if (selectedCategoryId === 0) {
		dishes = data.items;
	} else {
		dishes = data.items.filter(item =>
			item.categories.some(category => category.id === selectedCategoryId)
		);
	}

	return (
		<div className={classes.main}>
			<h1 className={classes.mainTitle}>Menu</h1>

			<div className={classes.content}>
				<div className={classes.categoryListSection}>
					<h2 className={classes.sectionTitle}>Categorías</h2>
					<CategoriesList
						categories={data.categories}
						selectedCategoryId={selectedCategoryId}
						setSelectedCategoryId={setSelectedCategoryId}
					/>
				</div>

				<div className={classes.dishesTableSection}>
					<h2 className={classes.sectionTitle}>Dishes</h2>
					<DishesList dishes={dishes} />
				</div>
			</div>
		</div>
	);
};

export default Menu;
