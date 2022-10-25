import React from "react";
import { useQuery, useMutation } from "@apollo/client";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

import { Button } from "@material-ui/core";
import Order from "./order";
import Menu from "./menu";
import { ADD_ITEM, GET_ORDER, CLOSE_ORDER } from "./order.query";
import { GET_TABLES, GET_TABLE_CURRENT_ORDER } from "tables/queries/tables.query";
import { toast } from "react-toastify";

export default function OrderPage({ orderId, tableId }) {
	const history = useHistory();

	const { data, loading, error } = useQuery(GET_ORDER, {
		variables: { orderId },
	});

	const [addItem] = useMutation(ADD_ITEM, {
		refetchQueries: [
			{ query: GET_ORDER, variables: { orderId } },
			{ query: GET_TABLES }
		],
	});

	const addToOrder = (itemId, quantity) => {
        addItem({ variables: { lineInput: { orderId, itemId, quantity } } });
	};

	const [closeOrder] = useMutation(CLOSE_ORDER, {
		refetchQueries: [
			{ query: GET_TABLES },
			{ query: GET_TABLE_CURRENT_ORDER, variables: { tableId } }
		],	
	});

	const handleClose = () => {
		closeOrder({ variables: { id: orderId } });		
		history.push("/");
		toast.success("The order has been successfully closed");
	};


	if (loading) return <p>Loading...</p>;
	if (error) return <p>ERROR: {error.message}</p>;
	return (
		<OrderMenu>
			<Order data={data.order} />
			<Menu addToOrder={addToOrder} />
			<Button color="secondary" onClick={handleClose}>
				Cobrar orden
			</Button>
		</OrderMenu>
	);
}

const OrderMenu = styled.div`
	display: grid;
	grid-template-columns: 2fr 1fr;
	grid-gap: 30px;
	margin-top: 30px;
	
`;
