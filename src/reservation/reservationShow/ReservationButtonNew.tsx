import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Button, Grid } from "@material-ui/core";

export default function ReservationButtonNew() {
	return (
		<Grid item xs={12}>
			<ButtonLink to="/reservation/new">
				<Button type="submit" variant="contained" color="primary">
					+ New reservation
				</Button>
			</ButtonLink>
		</Grid>
	);
}

const ButtonLink = styled(Link)`
	text-decoration: none;
`;
