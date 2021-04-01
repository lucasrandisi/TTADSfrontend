import React from "react";
import styled from "styled-components";

import CloseIcon from "@material-ui/icons/Close";
import DoneIcon from "@material-ui/icons/Done";
import HourglassEmptyIcon from "@material-ui/icons/HourglassEmpty";

type Status = "canceled" | "pending" | "served" | undefined;

const statuses = {
	canceled: {
		label: "Canceled",
		background: "#ffebeb",
		color: "#a50000",
		icon: <CloseIcon fontSize="small" />,
	},
	pending: {
		label: "Pending",
		background: "#fffedc",
		color: " #764400",
		icon: <HourglassEmptyIcon fontSize="small" />,
	},
	overtime: {
		label: "Overtime",
		background: "#eddbfa",
		color: " #5200a5",
		icon: <HourglassEmptyIcon fontSize="small" />,
	},
	served: {
		label: "Served",
		background: "#cdffe0",
		color: " #00592e",
		icon: <DoneIcon fontSize="small" />,
	},
};

export default function ReservationState({ status }) {
	const s = statuses[status];
	return (
		<>
			<Chip background={s.background} color={s.color}>
				{s.icon}
				{s.label}
			</Chip>
		</>
	);
}

const Chip = styled.span`
	padding: 4px 10px;
	border-radius: 16px;
	box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
	display: inline-flex;
	background-color: ${props => props.background};
	color: ${props => props.color};
`;
