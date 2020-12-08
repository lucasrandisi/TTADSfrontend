import React from "react";
import { useQuery } from "@apollo/client";
import { groupBy } from "../services/shared.service";
import TableGroup from "./table-group";
import { GET_TABLES } from "../queries/tables.query";

function TablesDashboard() {
	const { loading, error, data } = useQuery(GET_TABLES);

	if (loading) return "Loading...";
	if (error) return `Error! ${error.message}`;

	const groupedTables = groupBy(data.tables, "size");

	const groups: JSX.Element[] = [];

	Object.keys(groupedTables).map(size =>
		groups.push(<TableGroup key={size} size={size} tables={groupedTables[size]} />)
	);

	return <>{groups}</>;
}

export default TablesDashboard as React.FC;
