import React from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";

const TableDetails = React.lazy(() => import("./table-details/table-details"));
const TablesDashboard = React.lazy(() => import("./tables-dashboard/tables-dashboard"));

function Tables() {
	const { path } = useRouteMatch();

	return (
		<Switch>
			<Route exact path={path}>
				<TablesDashboard />
			</Route>
			<Route path={`${path}/:tableId`}>
				<TableDetails />
			</Route>
		</Switch>
	);
}

export default Tables as React.FC;
