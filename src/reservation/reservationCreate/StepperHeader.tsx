import React from "react";
import { Step, StepLabel, Stepper } from "@material-ui/core";

export default function StepperHeader({ step, childrenArray, completed }) {
	return (
		<Stepper activeStep={step} alternativeLabel>
			{childrenArray.map((child, index) => (
				<Step key={child.props.label} completed={step > index || completed}>
					<StepLabel>{child.props.label}</StepLabel>
				</Step>
			))}
		</Stepper>
	);
}
