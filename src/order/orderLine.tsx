import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const OrderLine = ({ data }) => {
	const { item, quantity } = data;
	const { title, pricePerUnit } = item;
	return (
		<tr>
			<td style={{ fontWeight: "bold" }}>
				<FontAwesomeIcon icon={faTimes} />
				{quantity}
			</td>
			<td>{title}</td>
			<td>${pricePerUnit}</td>
			<td>${pricePerUnit * quantity}</td>
			<td />
		</tr>
	);
};
export default OrderLine;
