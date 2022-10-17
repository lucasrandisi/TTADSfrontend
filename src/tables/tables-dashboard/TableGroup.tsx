import React from "react";
import styled from "styled-components";
import Table from "./Table";

export default function TableGroup(props) {
	const { size, tables, time } = props;

	return (
		<>
			<HeaderTable className="table-background">
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
	color: white;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const TablesGroupRow = styled.div`
	padding-top: 3vh;
	display: flex;
	justify-content: space-around;
	flex-wrap: wrap;
`;
