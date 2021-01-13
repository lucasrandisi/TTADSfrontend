import React, { useState } from "react";
import styled from "styled-components";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import TableReservations from "./reservations/table-reservations";
import TableOrder from "./order/table-order";

export default function TableDetails() {
	const [selectedTab, setSelectedTab] = useState(0);

	const handleChange = (_, newSelectedTab) => {
		setSelectedTab(newSelectedTab);
	};

	return (
		<>
			<StyledAppBar position="sticky">
				<Tabs value={selectedTab} onChange={handleChange}>
					<StyledTab label="Current Order" />
					<StyledTab label="Reservas" />
				</Tabs>
			</StyledAppBar>
			<div>{selectedTab === 0 && <TableOrder />}</div>
			<div>{selectedTab === 1 && <TableReservations />}</div>
		</>
	);
}

const StyledAppBar = styled(AppBar)`
	&& {
		background-color: ${props => props.theme.color1};
	}
`;

const StyledTab = styled(Tab)`
	&& {
		font-weight: bold;
		height: 10vh;

		@media (min-width: ${props => props.theme.md}) {
			font-size: 1.4rem;
		}

		@media (min-width: ${props => props.theme.lg}) {
			font-size: 1.2rem;
		}

		@media (min-width: ${props => props.theme.xl}) {
			font-size: 1.4rem;
		}
	}
`;
