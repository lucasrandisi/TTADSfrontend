import React from "react";
import { useQuery, useMutation } from "@apollo/client";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

import { Button } from "@material-ui/core";
import Order from "./order";
import Menu from "./menu";
import { ADD_ITEM, GET_ORDER, CLOSE_ORDER } from "./order.query";

export default function OrderPage({ orderId }) {
	const history = useHistory();

	const [addItem] = useMutation(ADD_ITEM, {
		refetchQueries: [{ query: GET_ORDER, variables: { orderId } }],
	});

	const addToOrder = (itemId, quantity) => {
		addItem({ variables: { orderId, itemId, quantity } });
	};

	const [closeOrder] = useMutation(CLOSE_ORDER);

	const handleClose = () => {
		closeOrder({ variables: { id: orderId } });
		history.push("/");
	};

	const { data, loading, error } = useQuery(GET_ORDER, {
		variables: { orderId },
	});

	if (loading) return <p>Loading...</p>;
	if (error) return <p>ERROR: {error.message}</p>;
	return (
		<OrderMenu>
			<Order data={data.order} />
			<Menu addToOrder={addToOrder} />

			<Button color="secondary" onClick={handleClose}>
				Cerrar
			</Button>
		</OrderMenu>
	);
}

const OrderMenu = styled.div`
	display: grid;
	grid-template-columns: 1fr 2fr;
	grid-gap: 10px;
`;
