import { gql } from "@apollo/client";

export const UPDATE_ITEM =  gql`
	mutation updateItem(
        $itemInput: itemInput!
		$id: ID!
	) {
		updateItem(
			id: $id
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

export const DELETE_ITEM = gql`
	mutation deleteItem($id: ID!) {
		deleteItem(id: $id)
	}
`;
