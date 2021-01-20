import React, { Suspense } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import styled, { ThemeProvider } from "styled-components";

import { theme } from "./styles/theme";
import Navbar from "./common/nav/Navbar";

const HistoryPage = React.lazy(() => import("./order/OrderHistoryPage"));
const TableDetails = React.lazy(() => import("./tables/table-details/TableDetails"));
const TablesDashboard = React.lazy(() =>
	import("./tables/tables-dashboard/tables-dashboard")
);

export default function Pages() {
	return (
		<BrowserRouter>
			<ThemeProvider theme={theme}>
				<Layout>
					<Navbar />
					<Main>
						<Switch>
							<Suspense fallback={<div>Loading...</div>}>
								<Route exact path="/" component={TablesDashboard} />
								<Route path="/table/:tableId" component={TableDetails} />
								<Route path="/orders" component={HistoryPage} />
							</Suspense>
						</Switch>
					</Main>
				</Layout>
			</ThemeProvider>
		</BrowserRouter>
	);
}

const Layout = styled.div`
	display: flex;
	flex-direction: row;
`;

const Main = styled.div`
	flex-grow: 1;
	height: 100vh;
	background-color: ${props => props.theme.color2};
`;
