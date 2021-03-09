import React from "react";
import styled from "styled-components";

const Button = ({ children, type = "button", onClick, icon }) => {
	return (
		<StyledButton type={type} onClick={onClick}>
			<Text>
				<Icon>{icon}</Icon>
				{children}
			</Text>
		</StyledButton>
	);
};
export default Button;

const StyledButton = styled.button`
	font-size: 1.5625rem;
	font-weight: 600;
	padding-left: 1rem;
	padding-right: 1rem;

	background-color: ${props => props.theme.calm};
	color: #f8f9fa;

	border-radius: 0.5rem;
	border-color: rgba(0, 0, 0, 0.2);
	border-style: solid;
	border-width: 1px;
	border-top-width: 0.0625rem;
	border-bottom-width: calc(0.2rem + 0.0625rem);
	box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.0125), 0 1px 1px rgba(0, 0, 0, 0.05);

	transition: all 0.1s ease-in;
	transition: color 0.1s ease-in-out, background-color 0.1s ease-in-out;

	&:hover {
		background-color: ${props => props.theme.calm_accent};
		cursor: pointer;
	}

	&:active {
		border-top-width: calc(0.2rem + 0.0625rem);
		border-bottom-width: 0.0625rem;
		outline: none;
	}

	&:focus {
		outline: 0;
	}
`;

const Text = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding-top: 1rem;
	padding-bottom: 1rem;
`;

const Icon = styled.div`
	padding-right: 0.6rem;
`;
