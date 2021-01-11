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
				reservationDateTime
			}
		}
	}
`;

export const GET_TABLE_RESERVATIONS = gql`
	query($tableId: ID!) {
		table(id: $tableId) {
			reservations {
				reservationDateTime
			}
		}
	}
`;

export const GET_TABLE_CURRENT_ORDER = gql`
	query($tableId: ID!) {
		table(id: $tableId) {
			currentOrder {
				id
				staff {
					firstName
					lastName
				}
			}
		}
	}
`;
