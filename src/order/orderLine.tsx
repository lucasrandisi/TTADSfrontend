import React from "react";

const OrderLine = ({ data }) => {
	const { item, quantity } = data;
	const { title, pricePerUnit } = item;
	return (
		<tr>
			<td>{quantity}</td>
			<td>{title}</td>
			<td>{pricePerUnit}</td>
			<td>{pricePerUnit * quantity}</td>
			<td />
		</tr>
	);
};
export default OrderLine;
