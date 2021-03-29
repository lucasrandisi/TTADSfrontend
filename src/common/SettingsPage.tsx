import React from "react";

import { Switch } from "@material-ui/core";

export default function SettingsPage({ theme, toggleTheme }) {
	return (
		<div>
			<h1>Settings</h1>
			<div>
				Toggle theme:
				<Switch checked={theme === "light"} onChange={toggleTheme} name="themeSwitch" />
			</div>
		</div>
	);
}
