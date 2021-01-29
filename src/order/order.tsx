import React from "react";

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

	return (
		<div className="container">
			<div className="header">
				<h3>Nro Orden: {id}</h3>
			</div>

			<table>
				<thead>
					<tr>
						<th>Cant.</th>
						<th>Descripcion</th>
						<th>Precio unit.</th>
						<th>Subtotal</th>
						<th />
					</tr>
				</thead>

				{lines && (
					<tbody>
						{lines.map(line => (
							<OrderLine key={line.id} data={line} onRemove={handleRemove} />
						))}
					</tbody>
				)}

				<tfoot>
					<tr>
						<td>Total:</td>
					</tr>
				</tfoot>
			</table>
		</div>
	);
};
export default Order;
