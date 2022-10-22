import { gql } from "@apollo/client";

export const GET_ORDER = gql`
	query GetOrder($orderId: ID!) {
		order(id: $orderId) {
			id
			createdAt
			paidAt
			status    
			lines {
				id
				quantity      
				item {
					title
					pricePerUnit
				}
			}
		}
	}
`;

export const ADD_ITEM = gql`
	mutation addItem($orderId: ID!, $itemId: ID!, $quantity: Int!) {
		createLine(line: { orderId: $orderId, itemId: $itemId, quantity: $quantity }) {
			id
		}
	}
`;

export const REMOVE_ITEM = gql`
	mutation removeItem($id: ID!) {
		deleteLine(id: $id)
	}
`;

export const CLOSE_ORDER = gql`
	mutation close($id: ID!) {
		closeOrder(id: $id)
	}
`;

export const DELETE_ORDER = gql`
	mutation deleteOrder($id: [ID!]) {
		deleteOrder(id: $id)
}
`;

export const GET_ORDERS = gql`
	query {
		orders {
			id
			createdAt
			status
			table{
				id
				size
			}
		}
	}
`;