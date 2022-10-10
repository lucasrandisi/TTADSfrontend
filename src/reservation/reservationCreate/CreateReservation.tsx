import React from "react";
import { useMutation, useQuery } from "@apollo/client";
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
import * as Yup from "yup";
import { FormikStep, FormikStepper } from "./FormikStepper";
import { CREATE_RESERVATION, GET_RESERVATIONS, UPDATE_RESERVATION } from "../queries/ReservationQuery";
import "./booking.scss";
import { MAX_TABLE } from "../../tables/queries/tables.query";
import _ from "lodash";

const useStyles = makeStyles(() => ({
	container: {
		paddingTop: "1.5rem",
		width: "1000px",
	},
	card: {
		paddingLeft: "80px",
		paddingRight: "80px",
		height: "100%",
	},
}));


const validationPersonalInf = Yup.object().shape({
	customerName: Yup.string().required("This field is required."),
	phone: Yup.string().phone("Invalid phone number.").required("This field is required"),
	email: Yup.string().email("Invalid email.").required("This field is required."),
});

export default function CreateReservation(props) {
	const { loading, error, data } = useQuery(MAX_TABLE);

	const [createNewReservation] = useMutation(CREATE_RESERVATION, {
		refetchQueries: [{ query: GET_RESERVATIONS }],
	});

	const [updateReservation] = useMutation(UPDATE_RESERVATION, {
		refetchQueries: [{ query: GET_RESERVATIONS }],
	});

	const classes = useStyles();

	// eslint-disable-next-line
	const FieldStyled = props => <TextField fullWidth variant="outlined" {...props} />;

	if (loading) return <p>Loading...</p>;
	if (error) return <p>ERROR: {error.message}</p>;

	const validationSize = () => {
		console.log(data.max_table)
		return Yup.object({
			partySize: Yup.number().required().moreThan(0).lessThan(data.max_table + 1),
		});
	}

	const createReservation = newReservation => {
		createNewReservation({ variables: newReservation });
	};


	const { editReservation } = props;

	const initialValues = !editReservation ? {
		partySize: 1,
		phone: "",
		email: "",
		customerName: "",
	} : editReservation;

	const handleSubmit = async values => {
		values.reservationDateTime
			.setHours(values.timeReservation.substring(0, 2), 0, 0);

		if (editReservation){
			updateReservation({ 
				variables: {id: editReservation.id, ...values} 
			});
		} else {
			createReservation(values);
		}
		await new Promise(r => setTimeout(r, 3000));
	};

	
	return (
		<>
			<CssBaseline />
			<Container className={classes.container}>
				<Card className="card-container">
					<CardContent className={classes.card}>
						<FormikStepper initialValues={initialValues} onSubmit={handleSubmit}>
							<FormikStep label="Amount of people" validationSchema={validationSize}>
								<Box paddingBottom={2}>
									<Field
										name="partySize"
										label="Number of people"
										type="number"
										component={FieldStyled}
										onInput = {(e : React.ChangeEvent<HTMLInputElement>) =>{
											e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0,12)
										}}
									/>
								</Box>
							</FormikStep>
							<FormikStep label="Booking day" />
							<FormikStep label="Booking time" />
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
