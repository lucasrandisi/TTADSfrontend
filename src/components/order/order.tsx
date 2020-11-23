import React from "react";
import OrderLine from "./orderLine";

const Order = ({data}) => {
	const {id, lines} = data;
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
						{lines.map((line) => (
							<OrderLine key={line.id} data={line} />
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
