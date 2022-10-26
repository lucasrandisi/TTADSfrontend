import React, {useState} from "react";
import { useParams } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faUsers, faChair } from "@fortawesome/free-solid-svg-icons";
import { CREATE_ORDER, GET_NEXT_TABLE_RESERVATIONS, GET_TABLES, GET_TABLE_CURRENT_ORDER } from "../queries/tables.query";
import OrderPage from "../../order/OrderPage";
import { GET_ORDERS } from "order/order.query";
import { Card, Button, Box } from "@material-ui/core";
import "./table.scss";

const TableDetails: React.FC = () => {
	const { tableId, resId } = useParams();

	const [createOrder] = useMutation(CREATE_ORDER, {
		refetchQueries: [
			{ query: GET_TABLE_CURRENT_ORDER, variables: { tableId } },
			{ query: GET_TABLES }, 
            { query: GET_ORDERS }
		],
	});

	const { data, loading, error } = useQuery(GET_TABLE_CURRENT_ORDER, {
		variables: { tableId },
		fetchPolicy: 'network-only',
	});

	if (loading) return <p>Loading...</p>;
	if (error) return <p>ERROR: {error.message}</p>;

	let { order } = data.table;

	const createNewOrder = () => {
		createOrder({ 
			variables: { tableId, resId: resId !== 'new' ? resId : undefined } 
		})
	}
	return (
		<>
			<h1 className="main-title">Order detail</h1>			
			<Card className="table-card">
				<Header>					
					<div style={{marginBottom: "8px"}}>
						<FontAwesomeIcon icon={faUsers} />&nbsp;
						Table identification: {tableId}
					</div>
					<div>
						<FontAwesomeIcon style={{marginRight: "15px"}} icon={faChair} />						
						{data.table.size}&nbsp;seats
					</div>
				</Header>

				{!order && (
					<>
						<Box textAlign='center'>
							<Button type="submit" variant="contained" color="primary"
								onClick={createNewOrder}
							>
								<FontAwesomeIcon icon={faPlus} />&nbsp;Nueva Orden								
							</Button>
						</Box>
					</>
				)}
				{order && <OrderPage orderId={order.id} tableId={tableId}/>}
			</Card>
		</>
	);
};
export default TableDetails;

const Header = styled("div")`
	display: flex;
	flex-direction: column;
`;
