import React from "react";
import { useQuery, gql } from "@apollo/client";
import styled from "styled-components";

const GET_ITEMS = gql`
	query {
		items {
			id
			title
			desc
			pricePerUnit
		}
	}
`;

const Menu = ({ addToOrder }) => {
	const { data, loading, error } = useQuery(GET_ITEMS);
	return (
		<>
			{!loading && !error && data && (
				<MenuGrid>
					{data.items.map(item => (
						<button key={item.id} type="button" onClick={() => addToOrder(item.id, 2)}>
							{item.title}
						</button>
					))}
				</MenuGrid>
			)}
		</>
	);
};

export default Menu;

const MenuGrid = styled.div`
	padding: 5px;
	display: grid;
	grid-template-columns: repeat(8, 1fr);
	column-gap: 5px;
	row-gap: 5px;
`;
