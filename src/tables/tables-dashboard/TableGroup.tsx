import React from "react";
import styled from "styled-components";
import Table from "./Table";

export default function TableGroup(props) {
	const { size, tables } = props;

	return (
		<>
			<Header>
				<span>{size} Asientos</span>
			</Header>
			<TablesGroupRow>
				{tables.map(table => (
					<Table key={table.id} table={table} />
				))}
			</TablesGroupRow>
		</>
	);
}

const Header = styled.div`
	height: 10vh;
	background-color: ${props => props.theme.color1};
	color: white;
	font-weight: 700;
	display: flex;
	justify-content: center;
	align-items: center;

	@media (min-width: ${props => props.theme.md}) {
		height: 7vh;
		font-size: 1.2rem;
	}
`;

const TablesGroupRow = styled.div`
	padding-top: 3vh;
	display: flex;
	justify-content: space-around;
	flex-wrap: wrap;
`;
