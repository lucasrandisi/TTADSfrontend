import React from "react";
import styled from "styled-components";
import { useMutation } from "@apollo/client";

import OrderLine from "./orderLine";
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
		<div>
			<div>
				<h3>Nro Orden: {id}</h3>
			</div>

			<StyledTable>
				<colgroup>
					<col style={{ width: "10%" }} />
					<col style={{ width: "65%" }} />
					<col style={{ width: "15%" }} />
					<col style={{ width: "10%" }} />
				</colgroup>
				<thead>
					<tr>
						<th>Cant.</th>
						<th>Descripcion</th>
						<th>Subtotal</th>
						<th />
					</tr>
				</thead>
				<tbody>
					{lines.map(line => (
						<OrderLine key={line.id} data={line} onRemove={handleRemove} />
					))}
					<br></br>
					<tr>
						<td></td>
						<td><b>Total</b></td>
						<td>${total}</td>
					</tr>
				</tbody>
			</StyledTable>
		</div>
	);
};
export default Order;

const StyledTable = styled.table`
	table-layout: fixed;
	width: 100%;
`;
