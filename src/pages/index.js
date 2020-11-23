import React from "react";
import {BrowserRouter, Switch, Route} from "react-router-dom";

import OrderPage from "./orderPage";

export default function Pages() {
	return (
		<BrowserRouter>
			<Switch>
				<Route path="/order/:id" component={OrderPage} />
			</Switch>
		</BrowserRouter>
	);
}
