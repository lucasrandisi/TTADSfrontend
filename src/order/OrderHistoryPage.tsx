//@ts-nocheck
import React, { useState, useEffect } from "react";
import { useQuery, gql, useMutation, useLazyQuery  } from "@apollo/client";

import { Card } from "@material-ui/core";
import moment from "moment";

import styled from "styled-components";

import MUIDataTable from "mui-datatables";
import "./order.scss";
import { DELETE_ORDER, GET_ORDER, GET_ORDERS } from "./order.query";
import { toast } from "react-toastify";
import BasicModal from "utils/basicModal";
import _ from "lodash";

export default function HistoryPage() {
	const [currentOrder, setCurrentOrder] = useState({});
	const [childrenModal, setChildrenModal] = useState<any>(null);

	const { refetch } = useQuery(GET_ORDER, {
		skip: _.isEmpty(currentOrder)
	  })
	
	const { data, loading, error } = useQuery(GET_ORDERS);

	const [deleteOrder] = useMutation(DELETE_ORDER, {
		refetchQueries: [
			{ query: GET_ORDERS },
		],	
	});
	
	
	if (loading) return <p>Loading...</p>;
	if (error) return <p>ERROR: {error.message}</p>;

	const columns = ["Order id", "Order at", "Table id", "Table size", "Status"];

	const orders = data.orders.map((order) => [
		order.id, 
		moment(order.createdAt).format("DD/MM/YYYY HH:mm"),
		order.table.id,
		order.table.size,
		order.status
	]);

	const handleDeleteOrders = (rowsDeleted) => {
		console.log("hola")
		deleteOrder(
			{ variables: 
				{ 
					id: rowsDeleted.data.map((order) => data.orders[order.index].id) 
				} 
			}
		);		
		toast.success("Orden/es eliminadas exitosamente");
	}

	const formatDate = (date) => date ? moment(date).format("HH:mm DD/MM/YYYY") : "";

	const getTotal = (order) => 
	{
		let total = 0;

		order.map(line => {
			total = total + line.quantity * line.item.pricePerUnit
		})

		return total
	}
	
	const showOrder = (currentOrder) => {
		setChildrenModal(
			<BasicModal
				setChildrenModal={setChildrenModal}
				title="Order information"
				handleAction={() => {setCurrentOrder({})}}
				className="modal-order"
			>
				<p className="order-nro">Nro de orden: <b>{currentOrder.id}</b></p>
				

				<div className="info-order-especific">
					<p className="item">Created at: {formatDate(currentOrder.createdAt)} </p>
					<p className="item">Paid at: {formatDate(currentOrder.paidAt)}</p>
					<p className="item">Status: {currentOrder.status}</p>
				</div>

				{currentOrder.lines.length !== 0 ? 
					<div>
						<ol className="item-ul">
							<p className="title-detalle"><b>Detalle de la orden: </b></p>
							{currentOrder.lines.map((line) => 
								<Item key={line.item.title} className="item">
									${line.item.pricePerUnit} - {line.item.title} ({line.quantity} servings)
								</Item>			
							)}						
						</ol>						
						<p className="item-total">Total: <b>${getTotal(currentOrder.lines)}</b></p>
					</div>
					:
					<p>There are no lines</p>
				}
			</BasicModal>
		)
	}

	const options = {
		filterType: 'checkbox',
		onRowsDelete: handleDeleteOrders,
		onRowClick: async (row) => {
			const orderResult = await refetch({ orderId: row[0] })
			setCurrentOrder(orderResult.data.order)
			showOrder(orderResult.data.order)
		}
	};

	return (
		<div clasName="main">
			<h1 className="order-title">Orders list</h1>
			<Card className="container-order">				
				<MUIDataTable
					title={"Orders list"}
					data={orders}
					columns={columns}
					options={options}
				/>
			</Card>
			{childrenModal}
		</div>
	);
}

const Item = styled.li`
	margin-left: 20px;
`;
