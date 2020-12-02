import React from "react";
import {BrowserRouter, Switch, Route} from "react-router-dom";
import styled from "styled-components";

import Navbar from "../components/common/nav/Navbar";
import OrderPage from "./orderPage";
import HistoryPage from "./OrderHistoryPage";

export default function Pages() {
	return (
		<BrowserRouter>
			<Layout>
				<Navbar />
				<Page>
					<Switch>
						<Route path="/orders" component={HistoryPage} />
						<Route path="/order/:id" component={OrderPage} />
					</Switch>
				</Page>
			</Layout>
		</BrowserRouter>
	);
}

const Layout = styled.div`
	display: flex;
	flex-direction: row;
`;

const Page = styled.div`
	margin: 1rem;
`;
