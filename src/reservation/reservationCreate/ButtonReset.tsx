import React from "react";
import { makeStyles, Button, Grid } from "@material-ui/core";

const useStyles = makeStyles(() => ({
	gridReset: {
		paddingTop: "1rem",
		paddingLeft: "45%",
	},
}));
export default function ButtonReset({ handleReset, resetForm }) {
	const classes = useStyles();
	return (
		<div>
			<p>The reservation was created with suceess</p>
			<Grid container spacing={2} className={classes.gridReset}>
				<Grid item>
					<Button onClick={() => handleReset(resetForm)} variant="contained">
						Reset
					</Button>
				</Grid>
			</Grid>
		</div>
	);
}
