import { gql } from "@apollo/client";

export default gql`
	mutation createItem($itemInput: itemInput!) {
		createItem(itemInput: $itemInput) {
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