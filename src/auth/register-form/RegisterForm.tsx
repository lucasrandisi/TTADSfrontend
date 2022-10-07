import React from "react";
import "./RegisterForm.scss";
import { Input } from "@material-ui/core";

export default function RegisterForm(props) {
	const { setShowLogin } = props;

	const onSubmit = () => {
		setShowLogin(true);
	};
	return (
		<>
			<h2 className="regiser-form-title">Registrate</h2>
			<form onSubmit={onSubmit} className="register-form" noValidate autoComplete="off">
				<Input className="register-input" placeholder="Correo electronico" name="email" />
				<Input className="register-input" placeholder="Username" name="username" />
				<Input className="register-input" placeholder="Contraseña" name="password" />
				<Input
					className="register-input"
					placeholder="Repetir contraseña"
					name="repeat_password"
				/>
				<button type="submit" className="btn-submit">
					Registrarse
				</button>
			</form>
		</>
	);
}
