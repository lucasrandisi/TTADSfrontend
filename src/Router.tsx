import React, { Suspense } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import styled, { ThemeProvider } from "styled-components";

import { useTheme } from "styles/useTheme";
import { themes } from "./styles/theme";
import Navbar from "./common/nav/Navbar";

const HistoryPage = React.lazy(() => import("./order/OrderHistoryPage"));
const SettingsPage = React.lazy(() => import("common/SettingsPage"));
const ReservationsPage = React.lazy(() =>
	import("reservation/reservationShow/ReservationsPage")
);
const TableDetails = React.lazy(() => import("./tables/table-details/TableDetails"));
const TablesDashboard = React.lazy(() =>
	import("./tables/tables-dashboard/TablesDashboard")
);
const CreateReservation = React.lazy(() =>
	import("reservation/reservationCreate/CreateReservation")
);
const Menu = React.lazy(() => import("./menu/Menu"));
const ReservationMoreInfo = React.lazy(() =>
	import("reservation/reservationShow/reservationTable/ReservationMoreInfo")
);

export default function Pages() {
	const { theme, toggleTheme } = useTheme();

	return (
		<BrowserRouter>
			<ThemeProvider theme={themes[theme]}>
				<Layout>
					<Navbar />
					<Main>
						<Switch>
							<Suspense fallback={<div>Loading...</div>}>
								<Route exact path="/" component={TablesDashboard} />
								<Route path="/table/:tableId" component={TableDetails} />
								<Route path="/orders" component={HistoryPage} />
								<Route path="/menu" component={Menu} />
								<Route path="/reservations" component={ReservationsPage} />
								<Route path="/reservation/info/:id" component={ReservationMoreInfo} />
								<Route exact path="/reservation/new" component={CreateReservation} />
								<Route path="/settings">
									<SettingsPage theme={theme} toggleTheme={toggleTheme} />
								</Route>
							</Suspense>
						</Switch>
					</Main>
				</Layout>
			</ThemeProvider>
		</BrowserRouter>
	);
}

const Layout = styled.div`
	display: grid;
	grid-template-columns: auto 1fr;
`;

const Main = styled.div`
	flex-grow: 1;
	width: auto;
	background-color: ${props => props.theme.color2};
`;
