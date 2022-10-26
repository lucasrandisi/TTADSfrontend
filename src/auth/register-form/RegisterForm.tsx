import React from "react";
import "./RegisterForm.scss";
import { useFormik } from "formik";
import { OutlinedInput } from "@material-ui/core";
import * as Yup from "yup";
import { useMutation } from "@apollo/client";
import { toast } from "react-toastify";
import { REGISTER } from "../queries/users";

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
	const [register] = useMutation(REGISTER);

	const formik = useFormik({
		initialValues: initialValues(),
		validationSchema: Yup.object({
			email: Yup.string().email("Invalid email.").required("This field is required."),
			username: Yup.string().required("This field is required."),
			password: Yup.string()
				.required("This field is required.")
				.oneOf([Yup.ref("repeat_password")], "Las contraseñas no son iguales"),
			repeat_password: Yup.string()
				.required("This field is required.")
				.oneOf([Yup.ref("password")], "Las contraseñas no son iguales"),
		}),
		onSubmit: async formValues => {
			try {
				await register({
					variables: {
						input: {
							username: formValues.username,
							email: formValues.email,
							password: formValues.password,
						},
					},
				});

				toast.success("Usuario registrado correctamente");
				setShowLogin(true);
			} catch (error) {
				toast.error("El email ya se encuentra en uso");
			}
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
				<OutlinedInput
					value={formik.values.email}
					onChange={formik.handleChange}
					className="register-input"
					placeholder="Correo electronico"
					name="email"
					error={!!formik.errors.email}
				/>
				<OutlinedInput
					value={formik.values.username}
					onChange={formik.handleChange}
					className="register-input"
					placeholder="Username"
					name="username"
					error={!!formik.errors.username}
				/>
				<OutlinedInput
					value={formik.values.password}
					onChange={formik.handleChange}
					className="register-input"
					placeholder="Contraseña"
					name="password"
					type="password"
					error={!!formik.errors.password}
				/>
				<OutlinedInput
					value={formik.values.repeat_password}
					onChange={formik.handleChange}
					className="register-input"
					placeholder="Repetir contraseña"
					name="repeat_password"
					type="password"
					error={!!formik.errors.repeat_password}
				/>
				<button type="submit" className="btn-submit">
					Registrarse
				</button>
				<button type="button" className="btn-reset" onClick={formik.handleReset}>
					Clear
				</button>
			</form>
		</>
	);
}
