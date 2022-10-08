import React from "react";
import "./LoginForm.scss";
import { OutlinedInput } from "@material-ui/core";
import { useFormik } from "formik";

function initialValues() {
	return {
		email: "",
		password: "",
	};
}
export default function LoginForm() {
	const formik = useFormik({
		initialValues: initialValues(),
		validationSchema: null,
		onSubmit: () => {},
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
				/>
				<OutlinedInput
					className="register-input"
					placeholder="Contraseña"
					name="password"
					type="password"
					onChange={formik.handleChange}
					value={formik.values.password}
				/>
				<button type="submit" className="btn-submit">
					Iniciar sesión
				</button>
			</form>
		</>
	);
}
