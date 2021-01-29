import React from "react";
import { useQuery, useMutation } from "@apollo/client";
import styled from "styled-components";

import Order from "./order";
import Menu from "./menu";
import { ADD_ITEM, GET_ORDER } from "./order.query";

export default function OrderPage({ orderId }) {
	const [addItem] = useMutation(ADD_ITEM, {
		refetchQueries: [{ query: GET_ORDER, variables: { orderId } }],
	});

	const addToOrder = (itemId, quantity) => {
		addItem({ variables: { orderId, itemId, quantity } });
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
		</OrderMenu>
	);
}

const OrderMenu = styled.div`
	display: grid;
	grid-template-columns: 1fr 2fr;
	grid-gap: 10px;
`;
