import React, { useState } from "react";
import Container from "@material-ui/core/Container";
import RegisterForm from "./register-form/RegisterForm";
import logo from "../assets/png/Restaurant.png";
import "./Auth.scss";

export default function Auth() {
	const [showLogin, setShowLogin] = useState(true);

	return (
		<Container fixed className="auth">
			<img alt="undefined" className="img-form" src={logo} />

			<div className="container-form">
				{showLogin ? <p>Login</p> : <RegisterForm setShowLogin={setShowLogin} />}
			</div>

			<div className="change-form">
				<p>
					{showLogin ? (
						<>
							¿No tienes una cuenta?
							{/* eslint-disable-next-line */}
							<span onClick={() => setShowLogin(!showLogin)}>Crea una</span>
						</>
					) : (
						<>
							¿Ya tienes una cuenta?
							{/* eslint-disable-next-line */}
							<span onClick={() => setShowLogin(!showLogin)}>Iniciar sesión</span>
						</>
					)}
				</p>
			</div>
		</Container>
	);
}
