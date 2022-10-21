//@ts-nocheck
import React, { useState } from "react";
import "./LoginForm.scss";
import { OutlinedInput } from "@material-ui/core";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation } from "@apollo/client";
import useAuth from "hooks/useAuth";
import { LOGIN } from "../queries/users";
import { setToken, decodeToken } from "../../utils/token";

function initialValues() {
	return {
		email: "",
		password: "",
	};
}
export default function LoginForm() {
	const [error, setError] = useState("");
	const [login] = useMutation(LOGIN);

	const { setAuth } = useAuth();

	const formik = useFormik({
		initialValues: initialValues(),
		validationSchema: Yup.object({
			email: Yup.string().email("Invalid email.").required("This field is required."),
			password: Yup.string().required("This field is required."),
		}),
		onSubmit: async formValues => {
			setError("");
			try {
				const { data } = await login({
					variables: {
						input: formValues,
					},
				});

				const { token } = data.login;
				setToken(token);
                setAuth(decodeToken(token));
			} catch (error) {
				setError(error.message);
			}
		},
	});
	return (
		<>
			<h2 className="regiser-form-title">Iniciar sesión</h2>
			<form
				className="login-form"
				noValidate
				autoComplete="off"
				onSubmit={formik.handleSubmit}>
				<OutlinedInput
					className="register-input"
					placeholder="Correo electronico"
					name="email"
					onChange={formik.handleChange}
					value={formik.values.email}
					error={!!formik.errors.email}
				/>
				<OutlinedInput
					className="register-input"
					placeholder="Contraseña"
					name="password"
					type="password"
					onChange={formik.handleChange}
					value={formik.values.password}
					error={!!formik.errors.password}
				/>
				<button type="submit" className="btn-submit">
					Iniciar sesión
				</button>
				{error && <p className="submit-error">{error}</p>}
			</form>
		</>
	);
}
