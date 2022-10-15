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
				staff {
					firstName
					lastName
				}
			}
		}
	}
`;

export const MAX_TABLE = gql`
	query {
		max_table
	}
`