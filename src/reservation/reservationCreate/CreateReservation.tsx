import React from "react";
import { useMutation } from "@apollo/client";

import {
	makeStyles,
	Box,
	Card,
	CardContent,
	Container,
	CssBaseline,
} from "@material-ui/core";

import { Field } from "formik";
import { TextField } from "formik-material-ui";
import { number, object, string } from "yup";
import { FormikStep, FormikStepper } from "./FormikStepper";
import { CREATE_RESERVATION, GET_RESERVATIONS } from "../queries/ReservationQuery";
import "yup-phone";

const useStyles = makeStyles(() => ({
	container: {
		width: "1000px",
	},
	card: {
		paddingLeft: "80px",
		paddingRight: "80px",
		height: "100%",
	},
}));

const sleep = time =>
	new Promise(acc => {
		setTimeout(acc, time);
	});

const validationSize = object({
	partySize: number().required().moreThan(0).lessThan(100),
});

const validationPersonalInf = object().shape({
	customerName: string().required("This field is required."),
	phone: string().phone().required("This field is required"),
	email: string().email("Invalid email").required("This field is required."),
});

export default function CreateReservation() {
	const [createNewReservation] = useMutation(CREATE_RESERVATION, {
		refetchQueries: [{ query: GET_RESERVATIONS }],
	});

	const createReservation = newReservation => {
		createNewReservation({ variables: newReservation });
	};

	const classes = useStyles();
	// eslint-disable-next-line
	const FieldStyled = props => <TextField fullWidth variant="outlined" {...props} />;

	return (
		<>
			<CssBaseline />
			<Container className={classes.container}>
				<Card>
					<CardContent className={classes.card}>
						<FormikStepper
							initialValues={{
								partySize: 1,
								phone: "",
								email: "",
								customerName: "",
							}}
							onSubmit={async values => {
								createReservation(values);
								await sleep(3000);
							}}>
							<FormikStep label="Amount of people" validationSchema={validationSize}>
								<Box paddingBottom={2}>
									<Field
										name="partySize"
										label="Number of people"
										type="number"
										component={FieldStyled}
									/>
								</Box>
							</FormikStep>
							<FormikStep label="Reservation day" />
							<FormikStep label="Personal data" validationSchema={validationPersonalInf}>
								<Box paddingBottom={2}>
									<Field
										name="customerName"
										label="Customer name"
										component={FieldStyled}
									/>
								</Box>
								<Box paddingBottom={2}>
									<Field name="phone" label="Phone number" component={FieldStyled} />
								</Box>
								<Box paddingBottom={2}>
									<Field name="email" label="Email adress" component={FieldStyled} />
								</Box>
							</FormikStep>
						</FormikStepper>
					</CardContent>
				</Card>
			</Container>
		</>
	);
}
