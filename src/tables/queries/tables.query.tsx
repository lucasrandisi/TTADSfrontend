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

export const GET_ALL_TABLES = gql`
	query {
		tables {
			id
			size
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

export const GET_TABLES_BY_ORDER = gql`
	query tablesByOrderDateTime($date: String, $time: String) {
		tablesByOrderDateTime(date: $date, time: $time){
			id
			size
 		}
	}
`;

export const GET_AVAILABLE_TABLES_BY_DATETIME = gql`
	query tablesByReservationDateTime($date: String, $time: String) {
		tablesByReservationDateTime(date: $date, time: $time){
			id
			size
 		},
		tablesByOrderDateTime(date: $date, time: $time){
			id
			size
 		}
	}
`;

export const MAX_TABLE = gql`
	query {
		max_table
	}
`