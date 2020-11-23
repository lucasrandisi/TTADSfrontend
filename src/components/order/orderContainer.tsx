import React from "react";
import {useQuery, gql} from "@apollo/client";
import Order from "./order";

const GET_ORDER = gql`
	query GetOrder($orderId: ID!) {
		order(id: $orderId) {
			id
			lines {
				id
				item {
					title
					pricePerUnit
				}
				quantity
			}
		}
	}
`;

export default function OrderContainer({id}) {
	const {data, loading, error} = useQuery(GET_ORDER, {
		variables: {orderId: id},
	});

	if (loading) return <p>Loading...</p>;
	if (error) return <p>ERROR: {error.message}</p>;
	if (!data.order) return <p>Not found</p>;
	return <Order data={data.order} />;
}
