import React from "react";
import styled from "styled-components";
import Table from "./Table";

export default function TableGroup(props) {
	const { size, tables, time } = props;

	return (
		<>
			<HeaderTable>
				<span>Tables with <b>{size}</b> seats</span>
			</HeaderTable>
			<TablesGroupRow>
				{tables.map(table => (
					<Table 
						key={table.id} 
						table={table}
						time={time}
					/>
				))}
			</TablesGroupRow>
		</>
	);
}

const HeaderTable = styled.div`
	height: 5vh;
	background-color: ${props => props.theme.header_table};
	color: white;
	display: flex;
	justify-content: center;
	align-items: center;
	border: 4px solid ${props => props.theme.header_border_table};
`;

const TablesGroupRow = styled.div`
	padding-top: 3vh;
	display: flex;
	justify-content: space-around;
	flex-wrap: wrap;
`;
