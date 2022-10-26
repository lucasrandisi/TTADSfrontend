import React from "react";

import { Switch, Button } from "@material-ui/core";

import { setToken } from "../utils/token"

export default function SettingsPage({ theme, toggleTheme }) {
	return (
		<div style={{paddingLeft: "40px"}}>			
			<div>
				<h1>Settings <Switch 
					checked={theme === "light"} 
					onChange={toggleTheme} 
					name="themeSwitch" 
				/></h1>
			</div>
			<div style={{paddingTop: "20px"}}>				
				<Button 
					color="primary" 
					variant="contained" 
					onClick={() => {
						setToken('');
						window.location.reload();
					}}
				>Cerrar sesión</Button>
			</div>
		</div>
	);
}
