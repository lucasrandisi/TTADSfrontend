import React from "react";
import { useParams } from "react-router-dom";
import { gql, useMutation, useQuery } from "@apollo/client";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faUsers } from "@fortawesome/free-solid-svg-icons";

import { GET_TABLE_CURRENT_ORDER } from "../queries/tables.query";
import OrderPage from "../../order/OrderPage";
import Button from "../../common/Button";

const CREATE_ORDER = gql`
	mutation($tableId: ID) {
		createOrder(tableId: $tableId) {
			id
			table {
				id
			}
		}
	}
`;

const TableDetails: React.FC = () => {
	const { tableId } = useParams();

	const [createOrder] = useMutation(CREATE_ORDER, {
		refetchQueries: [{ query: GET_TABLE_CURRENT_ORDER, variables: { tableId } }],
	});

	const { data, loading, error } = useQuery(GET_TABLE_CURRENT_ORDER, {
		variables: { tableId },
	});

	if (loading) return <p>Loading...</p>;
	if (error) return <p>ERROR: {error.message}</p>;

	const { order } = data.table;

	return (
		<>
			<Header>
				<p>Mesa: {tableId}</p>
				<div>
					<FontAwesomeIcon icon={faUsers} />
					{data.table.size}
				</div>
			</Header>

			{!order && (
				<Button
					onClick={() => createOrder({ variables: { tableId } })}
					icon={<FontAwesomeIcon icon={faPlus} />}>
					Nueva Orden
				</Button>
			)}

			{order && <OrderPage orderId={order.id} />}
		</>
	);
};
export default TableDetails;

const Header = styled("div")`
	display: flex;
	flex-direction: column;
`;
