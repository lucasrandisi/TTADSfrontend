import { gql } from "@apollo/client";

export default gql`
	query {
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
