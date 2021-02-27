import { gql } from "@apollo/client";

export default gql`
	mutation removeCategoryFromItem($id: ID!, $itemInput: itemInput!) {
		updateItem(id: $id, itemInput: $itemInput) {
			id
			title
			desc
			servings
			pricePerUnit
			categories {
				id
				desc
			}
		}
	}
`;
