import React from "react";
import { useQuery } from "@apollo/client";
import _ from "lodash";

import TableGroup from "./TableGroup";
import { GET_TABLES } from "../queries/tables.query";

import "./tables.scss"

export default function TablesDashboard({time }) {
	const { loading, error, data } = useQuery(GET_TABLES);

	if (loading) return <p>Loading...</p>;
	if (error) return <p>ERROR: {error.message}</p>;

	const groupedTables = _.groupBy(data.tables, "size");
	// const formatTime = time.slice(0,5);
	return (
		<div>
			<link href='https://fonts.googleapis.com/css?family=Poppins' rel='stylesheet'></link>
			{/* <h1>Disposición de mesas para el turno de las {formatTime} hs</h1> */}
			<div className="container-tables">
				{Object.keys(groupedTables).map(size => (
					<TableGroup 
						key={size} 
						size={size} 
						tables={groupedTables[size]}
						// time={time}						
					/>
				))}
			</div>

		</div>
	);
}

// date={date}