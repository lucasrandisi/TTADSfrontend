import { gql } from "@apollo/client";

export const UPDATE_ITEM =  gql`
	mutation updateItem(
        $itemInput: itemEditInput!
	) {
		updateItem(
			itemInput: $itemInput
		) {
			id
		}
	}
`;

export const CREATE_ITEM =  gql`
	mutation createItem(
		$title: String
		$desc: String
		$servings: Int
		$pricePerUnit: Int
	) {
		createItem(
			item: {
				title : $title,
				desc : $desc,
				servings : $servings,
				pricePerUnit : $pricePerUnit,
			}
		) {
			id
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
