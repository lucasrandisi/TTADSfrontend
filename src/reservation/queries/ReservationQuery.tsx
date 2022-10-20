import { gql } from "@apollo/client";

export const GET_RESERVATIONS = gql`
	query GetReservations {
		reservations {
			id
			customerName
			phone
			email
			partySize
			reservationDateTime
			cancelationDateTime
			table {
				id
				size
			}
			order{
				paidAt
			}
		}
	}
`;

export const CANCEL_RESERVATION = gql`
	mutation cancelReservation($id: ID!) {
		cancelReservation(id: $id)
	}
`;

export const GET_RESERVATION = gql`
	query GetReservation($id: ID!) {
		reservation(id: $id) {
			id
			customerName
			phone
			email
			partySize
			reservationDateTime
			cancelationDateTime
			table {
				id
				size
			}
		}
	}
`;

export const CREATE_RESERVATION = gql`
	mutation createNewReservation(
		$customerName: String!
		$phone: String
		$email: String
		$partySize: Int!
		$reservationDateTime: DateTime!
		$tableId: ID
	) {
		createReservation(
			reservation: {
				customerName: $customerName
				phone: $phone
				email: $email
				partySize: $partySize
				reservationDateTime: $reservationDateTime
				tableId: $tableId
			}
		) {
			id
		}
	}
`;

export const UPDATE_RESERVATION = gql`
	mutation updateReservation(
		$id: ID!
		$customerName: String!
		$phone: String
		$email: String
		$partySize: Int!
		$reservationDateTime: DateTime!
	) {
		updateReservation(
			id: $id,
			reservation: {
				customerName: $customerName
				phone: $phone
				email: $email
				partySize: $partySize
				reservationDateTime: $reservationDateTime
			}
		) {
			id
		}
	}
`;

export const GET_AVAILABLE_TABLES = gql`
	query($date: DateTime, $size: Int){
		tablesAvailableByDateSize(date: $date, size: $size){
			time
    		tableId
		}
	}
`;