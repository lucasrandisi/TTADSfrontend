import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import styled from "styled-components";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

import { GET_TABLE_CURRENT_ORDER } from "../../queries/tables.query";

function TableOrder() {
	const { tableId } = useParams();
	const { loading, error, data } = useQuery(GET_TABLE_CURRENT_ORDER, {
		variables: { tableId },
	});

	if (loading) return "Loading...";
	if (error) return `Error! ${error.message}`;

	const { currentOrder } = data.table;

	if (!currentOrder) {
		// TODO: OPEN NEW ORDER
		return <button type="button">+ New order</button>;
	}

	return (
		<Main>
			<OrderColumn>
				<Header>
					<TableInfo>
						<div>Table: {tableId}</div>
						<div>Orden Nº: #{currentOrder.id}</div>
					</TableInfo>
					<OrderInfo>
						<div>Seats: 2</div>
						<div>
							Mozo: {currentOrder.staff.firstName} {currentOrder.staff.lastName}
						</div>
					</OrderInfo>
				</Header>

				<TableContainer>
					<Table>
						<TableHead>
							<TableRow>
								<TableCell>Item</TableCell>
								<TableCell>Quantity</TableCell>
								<TableCell>Price</TableCell>
							</TableRow>
						</TableHead>
						<TableBody />
					</Table>
				</TableContainer>
			</OrderColumn>
			<FoodColumn />
		</Main>
	);
}

const Main = styled("div")`
	display: flex;
	height: 100%;
`;

const OrderColumn = styled("div")`
	width: 40%;
	padding: 2vh 2vw;
`;

const FoodColumn = styled("div")`
	width: 60%;
`;

const Header = styled("div")`
	display: flex;
	justify-content: space-between;
`;

const OrderInfo = styled("div")`
	div {
		font-weight: 600;
	}
`;

const TableInfo = styled("div")`
	div {
		font-weight: 600;
	}
`;

export default TableOrder as React.FC;
