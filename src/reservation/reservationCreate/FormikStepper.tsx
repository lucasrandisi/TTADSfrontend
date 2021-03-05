import React, { useState } from "react";
import { Form, Formik, FormikConfig, FormikValues } from "formik";
import CalendarReservations from "./CalendarReservations";
import "yup-phone";
import StepperActions from "./StepperActions";
import ButtonReset from "./ButtonReset";
import StepperHeader from "./StepperHeader";

export interface FormikStepProps
	extends Pick<FormikConfig<FormikValues>, "children" | "validationSchema"> {
	label: string;
}

export function FormikStep({ children }: FormikStepProps) {
	return <>{children}</>;
}

export function FormikStepper({ children, ...props }: FormikConfig<FormikValues>) {
	const childrenArray = React.Children.toArray(children) as React.ReactElement<
		FormikStepProps
	>[];
	const [step, setStep] = useState(0);
	const currentChild = childrenArray[step] as React.ReactElement<FormikStepProps>;

	const [reservationDate, setReservationDate] = React.useState(new Date());
	const [completed, setCompleted] = useState(false);

	function isLastStep() {
		return step === childrenArray.length - 1;
	}

	const handleReset = resetForm => {
		setStep(0);
		setCompleted(false);
		setReservationDate(new Date());
		resetForm();
	};

	const { initialValues, onSubmit } = props;
	return (
		<Formik
			initialValues={initialValues}
			validateOnBlur={false}
			validateOnChange={false}
			validationSchema={currentChild.props.validationSchema}
			onSubmit={async (values, helpers) => {
				if (isLastStep()) {
					await onSubmit({ ...values, reservationDateTime: reservationDate }, helpers);
					setCompleted(true);
				} else setStep(s => s + 1);
			}}>
			{({ values, isSubmitting, resetForm }) => (
				<Form autoComplete="off">
					<StepperHeader
						step={step}
						childrenArray={childrenArray}
						completed={completed}
					/>
					{completed ? (
						<ButtonReset handleReset={handleReset} resetForm={resetForm} />
					) : (
						<div>
							{currentChild}
							{step === 1 && (
								<CalendarReservations
									partySize={values.partySize}
									reservationDate={reservationDate}
									setReservationDate={setReservationDate}
								/>
							)}
							<StepperActions
								step={step}
								setStep={setStep}
								isSubmitting={isSubmitting}
								isLastStep={isLastStep}
							/>
						</div>
					)}
				</Form>
			)}
		</Formik>
	);
}
