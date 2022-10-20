import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { Button } from "@material-ui/core";
import "./order.scss";
import styled from "styled-components";

const OrderLine = ({ data, onRemove }) => {
	const { id, item, quantity } = data;
	const { title, pricePerUnit } = item;

	return (
		<tr>
			<ItemRow style={{ fontWeight: "bold" }}>
				<FontAwesomeIcon icon={faTimes} />
				&nbsp;{quantity}
			</ItemRow>
			<ItemTitle>{title}</ItemTitle>
			<ItemRow>${pricePerUnit}</ItemRow>
			<ItemRow>${pricePerUnit * quantity}</ItemRow>
			<Button onClick={() => onRemove(id)}>
				<FontAwesomeIcon icon={faTrashAlt} />
			</Button>
		</tr>
	);
};
export default OrderLine;

const ItemTitle = styled.td`
	font-size: 14px;
	padding-top: 10px;
	padding-bottom: 10px;
	border: 1px solid rgb(194, 191, 191) ;
	text-align: left;
	padding-left: 10px;
`;

const ItemRow = styled.td`
	font-size: 14px;
	padding-top: 10px;
	padding-bottom: 10px;
	text-align: center;
	border: 1px solid rgb(194, 191, 191);
`