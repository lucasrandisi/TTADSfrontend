import React from "react";
import styled from "styled-components";
import { useMutation } from "@apollo/client";

import OrderLine from "./orderLine";
import "./order.scss"
import { GET_ORDER, REMOVE_ITEM } from "./order.query";

const Order = ({ data }) => {
	const { id, lines } = data;

	const [removeItem] = useMutation(REMOVE_ITEM, {
		refetchQueries: [{ query: GET_ORDER, variables: { orderId: id } }],
	});

	const handleRemove = lineId => {
		removeItem({ variables: { id: lineId } });
	};

	let total = 0;

	lines.map(line => {
		total = total + line.item.pricePerUnit * line.quantity
	})

	return (
		<TableOrder>
			<div style={{marginBottom: "20px"}}>
				<h3>Nro Orden: {id}</h3>
			</div>

			<StyledTable>
				<colgroup>
					<col style={{ width: "10%" }} />
					<col style={{ width: "55%" }} />
					<col style={{ width: "10%" }} />
					<col style={{ width: "15%" }} />
					<col style={{ width: "10%" }} />
				</colgroup>
				<thead>
					<tr style={{height: "30px"}}>
						<th>Cant.</th>
						<th>Description</th>
						<th>$/Unit</th>
						<th>Subtotal</th>
						<th/>
					</tr>
				</thead>
				<tbody>
					{lines.map(line => (
						<OrderLine key={line.id} data={line} onRemove={handleRemove} />
					))}
					<tr>
						<td>&nbsp;</td>
						<td>&nbsp;</td>
						<td>&nbsp;</td>
						<td>&nbsp;</td>
					</tr>
					<tr >
						<td></td>
						<td>&nbsp;</td>
						<td><b>Total</b></td>
						<td style={{textAlign: "center"}}>${total}</td>
					</tr>
				</tbody>
			</StyledTable>
		</TableOrder>
	);
};
export default Order;

const StyledTable = styled.table`
	table-layout: fixed;
	width: 100%;
`;

const TableOrder = styled.table`
	border: 1px solid rgb(194, 191, 191);
	padding: 30px;    
	border-radius: 8px;
`;