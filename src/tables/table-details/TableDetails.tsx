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
import moment from "moment";

const TableDetails: React.FC = () => {
	const { tableId, resId } = useParams();

	const [createOrder] = useMutation(CREATE_ORDER, {
		refetchQueries: [
			{ query: GET_TABLE_CURRENT_ORDER, variables: { tableId } },
			{ query: GET_TABLES }, { query: GET_ORDERS }
		],
	});

	const { data, loading, error } = useQuery(GET_TABLE_CURRENT_ORDER, {
		variables: { tableId },
	});

	const tableReservations = useQuery(GET_NEXT_TABLE_RESERVATIONS, {
		variables: { tableId },
	});

	const [reservations, setReservations] = useState(false);

	if (loading) return <p>Loading...</p>;
	if (error) return <p>ERROR: {error.message}</p>;

	let { order } = data.table;

	const nextReservations = tableReservations.data?.getNextTableReservations

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

				{!order && !reservations && (
					<>
						<Box textAlign='center'>
							<Button type="submit" variant="contained" color="primary"
								onClick={() => createOrder({ 
									variables: { tableId, resId } 
								})}
							>
								<FontAwesomeIcon icon={faPlus} />&nbsp;Nueva Orden								
							</Button>
						</Box>
					</>
				)}

				{/* { !order && (
					<div>
						<Box textAlign='right'>
							<Button
								onClick={() => setReservations(true)}							
							>								
								&nbsp;Ver reservas de hoy
							</Button>
						</Box>

						{ !nextReservations && (
							<div>
								<p>Booking at: </p>
								{
									nextReservations.map((r) =>						
									<ul key={r.id}>
										<li>{moment(r.reservationDateTime).format('HH:mm')} hrs</li>
									</ul>)
								}
							</div>
						)}

					</div>
				)} */}
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
