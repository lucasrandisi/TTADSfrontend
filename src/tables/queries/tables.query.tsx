import { gql } from "@apollo/client";

export const GET_TABLES = gql`
	query {
		tables {
			id
			size
			currentOrder {
				createdAt
			}
			nextReservation {
				id
				reservationDateTime
				customerName
			}
		}
	}
`;

export const GET_TABLE_CURRENT_ORDER = gql`
	query($tableId: ID!) {
		table(id: $tableId) {
			size
			order: currentOrder {
				id
			}
		}
	}
`;

export const MAX_TABLE = gql`
	query {
		max_table
	}
`

export const CREATE_ORDER = gql`
	mutation createOrder ($tableId: ID!, $resId: ID) {
		createOrder(tableId: $tableId, resId: $resId) {
			id
			table {
				id
			}
		}
	}
`;

export const GET_NEXT_TABLE_RESERVATIONS = gql`
	query($tableId: ID!) {
		getNextTableReservations(tableId: $tableId) {
			id
			reservationDateTime
		}
	}
`;