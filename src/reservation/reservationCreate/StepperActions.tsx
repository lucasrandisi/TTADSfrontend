import React from "react";
import { makeStyles, Button, CircularProgress, Grid } from "@material-ui/core";

const useStyles = makeStyles(() => ({
	grid: {
		paddingTop: "1rem",
		paddingLeft: "40%",
	},
}));

export default function StepperActions(props) {
	const classes = useStyles();
	const { step, setStep, isSubmitting, isLastStep } = props;

	return (
		<Grid container spacing={2} className={classes.grid}>
			<Grid item>
				<Button
					disabled={step === 0}
					onClick={() => setStep(s => s - 1)}
					variant="contained">
					Back
				</Button>
			</Grid>
			<Grid item>
				<Button
					startIcon={isSubmitting ? <CircularProgress size="1rem" /> : null}
					disabled={isSubmitting}
					variant="contained"
					color="primary"
					type="submit">
					{/* eslint-disable-next-line */}
					{isSubmitting ? "Loading" : isLastStep() ? "Create" : "Next"}
				</Button>
			</Grid>
		</Grid>
	);
}
