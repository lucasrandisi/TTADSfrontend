import React from "react";
import {BrowserRouter, Switch, Route} from "react-router-dom";
import styled from "styled-components";

import Navbar from "../components/common/nav/Navbar";
import OrderPage from "./orderPage";

export default function Pages() {
	return (
		<BrowserRouter>
			<Layout>
				<Navbar />
				<Switch>
					<Route path="/order/:id" component={OrderPage} />
				</Switch>
			</Layout>
		</BrowserRouter>
	);
}

const Layout = styled.div`
	display: flex;
	flex-direction: row;
`;
