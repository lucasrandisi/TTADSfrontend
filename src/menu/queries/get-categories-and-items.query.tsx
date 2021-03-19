import { gql } from "@apollo/client";

export default gql`
	query getCategoriesAndItems {
		categories {
			id
			desc
		}
		items {
			id
			title
			desc
			servings
			pricePerUnit
			categories {
				id
			}
		}
	}
`;
