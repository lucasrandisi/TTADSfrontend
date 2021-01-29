import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { Button } from "@material-ui/core";

const OrderLine = ({ data, onRemove }) => {
	const { id, item, quantity } = data;
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
			<Button onClick={() => onRemove(id)}>
				<FontAwesomeIcon icon={faTrashAlt} />
			</Button>
		</tr>
	);
};
export default OrderLine;
