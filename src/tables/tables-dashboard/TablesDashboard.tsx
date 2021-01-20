import React from "react";
import { useQuery } from "@apollo/client";
import _ from "lodash";

import TableGroup from "./TableGroup";
import { GET_TABLES } from "../queries/tables.query";

const TablesDashboard: React.FC = () => {
	const { loading, error, data } = useQuery(GET_TABLES);

	if (loading) return <p>Loading...</p>;
	if (error) return <p>ERROR: {error.message}</p>;

	const groupedTables = _.groupBy(data.tables, "size");

	return (
		<div>
			{Object.keys(groupedTables).map(size => (
				<TableGroup key={size} size={size} tables={groupedTables[size]} />
			))}
		</div>
	);
};

export default TablesDashboard;
