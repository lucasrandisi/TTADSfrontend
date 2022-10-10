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
		}
	}
`;

export const DELETE_RESERVATION = gql`
	mutation deleteReservation($id: ID!) {
		deleteReservation(id: $id)
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
	) {
		createReservation(
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

export const GET_RESERVATIONS_TABLES = gql`
	query($size: Int!) {
		reservationsBySize(size: $size)
	}
`;

export const GET_RESERVATIONS_BY_DATE = gql`
	query($reservationDate: DateTime!, $size: Int!) {
		reservationsByDate(reservationDate: $reservationDate, size: $size){
			reservationDateTime
			table {
				id
			}
		}
	}
`;