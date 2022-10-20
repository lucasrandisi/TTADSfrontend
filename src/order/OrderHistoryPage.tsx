import React from "react";
import { useQuery, gql, useMutation  } from "@apollo/client";

import { Card } from "@material-ui/core";
import moment from "moment";

import MUIDataTable from "mui-datatables";
import "./order.scss";
import { DELETE_ORDER, GET_ORDERS } from "./order.query";
import { toast } from "react-toastify";

export default function HistoryPage() {
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
	
	const options = {
		filterType: 'checkbox',
		onRowsDelete: handleDeleteOrders
	};

	return (
		<>
			<h1 className="order-title">Orders list</h1>
			<Card className="container-order">				
				<MUIDataTable
					title={"Orders list"}
					data={orders}
					columns={columns}
					options={options}
				/>
			</Card>
		</>
	);
}
