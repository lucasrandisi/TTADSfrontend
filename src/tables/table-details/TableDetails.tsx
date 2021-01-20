import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import styled from "styled-components";

import { GET_TABLE_CURRENT_ORDER } from "../queries/tables.query";
import OrderPage from "../../order/OrderPage";

const TableDetails: React.FC = () => {
	const { tableId } = useParams();

	const { data, loading, error } = useQuery(GET_TABLE_CURRENT_ORDER, {
		variables: { tableId },
	});

	if (loading) return <p>Loading...</p>;
	if (error) return <p>ERROR: {error.message}</p>;

	const { order } = data.table;
	if (!order) {
		// TODO: OPEN NEW ORDER
		return <button type="button">+ New order</button>;
	}

	return (
		<div>
			<Header>
				<p>Mesa: {tableId}</p>
				<p>Sillas: {data.table.size}</p>
			</Header>

			<OrderPage orderId={order.id} />
		</div>
	);
};
export default TableDetails;

const Header = styled("div")`
	display: flex;
	flex-direction: column;
`;
