import { gql } from "@apollo/client";

export const UPDATE_ITEM =  gql`
	mutation updateItem(
		$id: ID!
        $itemInput: itemInput!
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
	mutation createItem( $item: itemInput! ) {
		createItem(item : $item ) { id }
	}
`;

export const DELETE_ITEM = gql`
	mutation deleteItem($id: ID!) {
		deleteItem(id: $id)
	}
`;
