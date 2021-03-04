import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const NumberInput = ({ minValue = 0, maxValue = 10, onChange }) => {
	const [counter, setCounter] = useState(0);

	const handleDecrement = () => {
		setCounter(counter - 1);
	};

	const handleIncrement = () => {
		setCounter(counter + 1);
	};

	useEffect(() => onChange(counter), [counter, onChange]);

	return (
		<Stepper>
			<IncrementButton
				type="button"
				onClick={handleDecrement}
				disabled={counter === minValue}>
				<FontAwesomeIcon icon={faMinus} />
			</IncrementButton>

			<div>{counter}</div>

			<IncrementButton
				type="button"
				onClick={handleIncrement}
				disabled={counter === maxValue}>
				<FontAwesomeIcon icon={faPlus} />
			</IncrementButton>
		</Stepper>
	);
};
export default NumberInput;

const Stepper = styled.div`
	display: inline-flex;
	align-items: center;
	justify-content: space-between;
	width: 104px;
	height: 32px;
	color: rgb(34, 34, 34);
	font-weight: 400;
	font-size: 16px;
	line-height: 20px;
`;

const IncrementButton = styled.button`
	width: 32px;
	height: 32px;
	flex-grow: 0;
	flex-shrink: 0;
	cursor: pointer;

	display: inline-flex;
	margin: 0px;
	padding: 0px;
	text-align: center;
	border-width: 1px;
	border-style: solid;
	border-color: rgb(176, 176, 176);
	color: rgb(113, 113, 113);
	outline: none;
	align-items: center;
	justify-content: center;
	background: rgb(255, 255, 255);
	border-radius: 50%;

	&:hover {
		color: rgb(34, 34, 34);
		border-color: rgb(34, 34, 34);
		background: rgb(255, 255, 255);
	}

	&:disabled {
		cursor: not-allowed;
		color: rgb(235, 235, 235);
		border-color: rgb(235, 235, 235);
		background: rgb(255, 255, 255);
	}
`;
