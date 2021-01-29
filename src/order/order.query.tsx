import { gql } from "@apollo/client";

export const GET_ORDER = gql`
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
