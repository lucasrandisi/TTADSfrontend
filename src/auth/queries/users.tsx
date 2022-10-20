import { gql } from "@apollo/client";

export const REGISTER = gql`
	mutation register($input: UserInput!) {
		registerUser(input: $input) {
			id
			username
			password
			email
		}
	}
`;

export const LOGIN = gql`
	mutation login($input: LoginInput!) {
		login(input: $input) {
			token
		}
	}
`;
