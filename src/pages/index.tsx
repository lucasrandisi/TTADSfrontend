import React, { Suspense } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import styled, { ThemeProvider } from "styled-components";

import { theme } from "../styles/theme";
import Navbar from "../components/common/nav/Navbar";

const OrderPage = React.lazy(() => import("./orderPage"));
const TablesPage = React.lazy(() => import("../tables"));

export default function Pages() {
	return (
		<BrowserRouter>
			<ThemeProvider theme={theme}>
				<Layout>
					<Navbar />
					<Main>
						<Switch>
							<Suspense fallback={<div>Loading...</div>}>
								<Route path="/mesas" component={TablesPage} />
								<Route path="/order/:id" component={OrderPage} />
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
