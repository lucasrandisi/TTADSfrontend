import React from "react";
import { makeStyles, Button, CircularProgress, Grid } from "@material-ui/core";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles(() => ({
	grid: {
		paddingTop: "1rem",
		paddingLeft: "40%",
	},
}));

export default function StepperActions(props) {
	const classes = useStyles();
	const { step, setStep, isSubmitting, isLastStep, disable, setDisable } = props;
	const history = useHistory();

	const setCurrentStep = (step) => {
		if (!step){
			history.push("/reservations");
		} else {
			setStep((s: number) => s - 1)
		}
		setDisable(false)
	};

	return (
		<Grid container spacing={2} className={classes.grid}>
			<Grid item>
				<Button					
					onClick={() => setCurrentStep(step)}
					variant="contained">
					Back
				</Button>
			</Grid>
			<Grid item>
				<Button
					startIcon={isSubmitting ? <CircularProgress size="1rem" /> : null}
					disabled={disable || isSubmitting}
					variant="contained"
					color="primary"
					type="submit">
					{/* eslint-disable-next-line */}
					{isSubmitting ? "Loading" : isLastStep ? "Save" : "Next"}
				</Button>
			</Grid>
		</Grid>
	);
}
