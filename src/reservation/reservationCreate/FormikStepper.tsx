import React, { useState } from "react";
import { Form, Formik, FormikConfig, FormikValues } from "formik";
import CalendarReservations from "./CalendarReservations";
import "yup-phone";
import StepperActions from "./StepperActions";
import ButtonReset from "./ButtonReset";
import StepperHeader from "./StepperHeader";
import TimeReservation from "./TimeReservation";
import moment from 'moment';

export interface FormikStepProps
	extends Pick<FormikConfig<FormikValues>, "children" | "validationSchema"> {
	label: string;
}

export function FormikStep({ children }: FormikStepProps) {
	return <>{children}</>;
}

export function FormikStepper({ children, ...props }: FormikConfig<FormikValues>) {
	const { initialValues, onSubmit } = props;
	const childrenArray = React.Children.toArray(children) as React.ReactElement<
		FormikStepProps
	>[];
	const [step, setStep] = useState(0);
	const currentChild = childrenArray[step] as React.ReactElement<FormikStepProps>;
	const times = ["19:00", "21:00", "23:00"]; // buscar de la base
	const editMode = initialValues.reservationDateTime ? true : false;
	const [reservationDate, setReservationDate] = React.useState<Date | undefined>(
		initialValues.reservationDateTime ? 
		new Date(initialValues.reservationDateTime) :
		new Date()
	);
	const [timeReservation, setTimeReservation] = React.useState<String | undefined>(
		initialValues.reservationDateTime ? 
			moment(initialValues.reservationDateTime).format("HH:mm") :
			times[0]
	);
	const [completed, setCompleted] = useState(false);

	const isLastStep = step === childrenArray.length - 1;

	const handleReset = resetForm => {
		setStep(0);
		setCompleted(false);
		setReservationDate(undefined);
		resetForm();
	};

	return (
		<Formik
			initialValues={initialValues}
			validateOnBlur={false}
			validateOnChange={false}
			validationSchema={currentChild.props.validationSchema}
			onSubmit={async (values, helpers) => {
				if (isLastStep) {
					await onSubmit({ 
						...values, 
						reservationDateTime: reservationDate,
						timeReservation: timeReservation
					}, helpers);
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
					{!completed && (
						<div>
							{currentChild}
							{step === 1 && (
								<CalendarReservations
									partySize={values.partySize}
									reservationDate={reservationDate}
									setReservationDate={setReservationDate}
								/>
							)}
							{step === 2 && (
								<TimeReservation
									partySize={values.partySize}
									reservationDate={reservationDate}
									timeReservation={timeReservation}
									setTimeReservation = {setTimeReservation}
									times={times}
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
					{completed && <ButtonReset handleReset={handleReset} resetForm={resetForm} />}
				</Form>
			)}
		</Formik>
	);
}
