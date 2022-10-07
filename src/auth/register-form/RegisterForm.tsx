import React from "react";
import "./RegisterForm.scss";
import { useFormik } from "formik";
import { Input } from "@material-ui/core";

function initialValues() {
	return {
		email: "",
		username: "",
		password: "",
		repeat_password: "",
	};
}

export default function RegisterForm(props) {
	const { setShowLogin } = props;

	const formik = useFormik({
		initialValues: initialValues(),
		validationSchema: null,
		onSubmit: () => {
			setShowLogin(true);
		},
	});

	return (
		<>
			<h2 className="regiser-form-title">Registrate</h2>
			<form
				onSubmit={formik.handleSubmit}
				className="register-form"
				noValidate
				autoComplete="off">
				<Input
					value={formik.values.email}
					onChange={formik.handleChange}
					className="register-input"
					placeholder="Correo electronico"
					name="email"
				/>
				<Input
					value={formik.values.username}
					onChange={formik.handleChange}
					className="register-input"
					placeholder="Username"
					name="username"
				/>
				<Input
					value={formik.values.password}
					onChange={formik.handleChange}
					className="register-input"
					placeholder="Contraseña"
					name="password"
				/>
				<Input
					value={formik.values.repeat_password}
					onChange={formik.handleChange}
					className="register-input"
					placeholder="Repetir contraseña"
					name="repeat_password"
				/>
				<button type="submit" className="btn-submit">
					Registrarse
				</button>
				<button type="button" onClick={formik.handleReset}>
					Reset
				</button>
			</form>
		</>
	);
}
