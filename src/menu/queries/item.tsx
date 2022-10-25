import { gql } from "@apollo/client";

export const UPDATE_ITEM =  gql`
	mutation updateItem($id: ID!, $itemInput: ItemInput!) {
		updateItem(id: $id, itemInput: $itemInput) {
			id
		}
	}
`;

export const CREATE_ITEM =  gql`
	mutation createItem( $item: ItemInput! ) {
		createItem(itemInput : $item ) { id }
	}
`;

export const DELETE_ITEM = gql`
	mutation deleteItem($id: ID!) {
		deleteItem(id: $id)
	}
`;
