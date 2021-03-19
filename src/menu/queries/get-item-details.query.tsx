import { gql } from "@apollo/client";

export default gql`
	query getItemDetails($id: ID!) {
		item(id: $id) {
			id
			title
            desc
            cookTime
			servings
			pricePerUnit
			categories {
                id,
                desc
			}
		}
	}
`;


