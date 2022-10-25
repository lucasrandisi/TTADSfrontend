import React, { useState } from "react";
import { Form, Formik, FormikConfig, FormikValues } from "formik";
import CalendarReservations from "./CalendarReservations";
import "yup-phone";
import StepperActions from "./StepperActions";
import ButtonReset from "./ButtonReset";
import StepperHeader from "./StepperHeader";
import TimeReservation from "./TimeReservation";
import { unionDateTime } from "utils/util";
import moment from "moment";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";

export interface FormikStepProps
	extends Pick<FormikConfig<FormikValues>, "children" | "validationSchema"> {
	label: string;
}

export function FormikStep({ children }: FormikStepProps) {
	return <>{children}</>;
}

export function FormikStepper({ children, ...props }) {
	const { initialValues, onSubmit, handleClose } = props;
	const childrenArray = React.Children.toArray(children) as React.ReactElement<
		FormikStepProps
	>[];
	const [step, setStep] = useState(0);
	const [disable, setDisable] = useState(false);
	const [availableTable, setAvailableTable] = useState("");
	const currentChild = childrenArray[step] as React.ReactElement<FormikStepProps>;

	const editMode = initialValues.reservationDateTime ? true : false;
	const [reservationDate, setReservationDate] = React.useState<Date | undefined>(
		initialValues.reservationDateTime ? 
		new Date(initialValues.reservationDateTime) : new Date()
	);
  	const initialTime = "08:00";

	const [timeReservation, setTimeReservation] = React.useState<String | undefined>(
		initialValues.reservationDateTime ? 
		moment(initialValues.reservationDateTime).format("HH:mm") : initialTime
	);
	const [completed, setCompleted] = useState(false);

	const isLastStep = step === childrenArray.length - 1;

	const handleReset = resetForm => {
		setStep(0);
		setCompleted(false);
		setReservationDate(new Date());
    	setTimeReservation(initialTime);
		resetForm();
	};

	const history = useHistory();
	
	return (
		<Formik
			initialValues={initialValues}
			validateOnBlur={false}
			validateOnChange={false}
			validationSchema={currentChild.props.validationSchema}
			onSubmit={async (values, helpers) => {
				if (isLastStep) {

					let setTime = availableTable
					if(!availableTable){					
						setTime = initialValues.table.id;
					}
					await onSubmit({ 
						...values, 
						reservationDateTime: unionDateTime(reservationDate, timeReservation),
						tableId: setTime
					}, helpers)
					setCompleted(true);
					toast.success("Booking saved with success");
					history.push("/reservations");
					props.handleClose()
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
									setAvailableTable={setAvailableTable}
									setDisable={setDisable}
								/>
							)}
							<StepperActions
								step={step}
								setStep={setStep}
								isSubmitting={isSubmitting}
								isLastStep={isLastStep}
								disable={disable}
								setDisable={setDisable}
								handleClose={handleClose}
							/>
						</div>
					)}
					{/* {completed && !editMode && <ButtonReset handleReset={handleReset} resetForm={resetForm} />} */}
				</Form>
			)}
		</Formik>
	);
}