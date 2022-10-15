import React, {useState} from "react";
import { useParams } from "react-router-dom";
import { gql, useMutation, useQuery } from "@apollo/client";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faUsers } from "@fortawesome/free-solid-svg-icons";

import { GET_TABLES, GET_TABLE_CURRENT_ORDER } from "../queries/tables.query";
import OrderPage from "../../order/OrderPage";
import Button from "../../common/Button";

const CREATE_ORDER = gql`
	mutation($tableId: ID, $resId: ID) {
		createOrder(tableId: $tableId, resId: $resId) {
			id
			table {
				id
			}
		}
	}
`;

const TableDetails: React.FC = () => {
	const { tableId, resId } = useParams();

	const [createOrder] = useMutation(CREATE_ORDER, {
		refetchQueries: [
			{ query: GET_TABLE_CURRENT_ORDER, variables: { tableId } },
			{ query: GET_TABLES }
		],
	});

	const { data, loading, error } = useQuery(GET_TABLE_CURRENT_ORDER, {
		variables: { tableId },
	});

	const [reservations, setReservations] = useState(false);

	if (loading) return <p>Loading...</p>;
	if (error) return <p>ERROR: {error.message}</p>;

	let { order } = data.table;

	return (
		<>
			<Header>
				<p>Mesa: {tableId}</p>
				<div>
					<FontAwesomeIcon icon={faUsers} />
					{data.table.size}
				</div>
			</Header>

			{!order && !reservations && (
				<>
					<Button
						onClick={() => createOrder({ variables: { tableId, resId } })}
						icon={<FontAwesomeIcon icon={faPlus} />}>
						Nueva Orden
					</Button>

					<Button
						onClick={() => setReservations(true)}
						icon={<FontAwesomeIcon icon={faPlus} />}>
						Ver reservas de hoy
					</Button>
				</>
			)}
			{order && <OrderPage orderId={order.id} tableId={tableId}/>}
		</>
	);
};
export default TableDetails;

const Header = styled("div")`
	display: flex;
	flex-direction: column;
`;
