import React from "react";
import {
	EventNoteRounded,
	HomeRounded,
	RestaurantRounded,
	SettingsRounded,
	TimerRounded,
} from "@material-ui/icons";

const SidebarRoutes = [
	{
		title: "Home",
		path: "/",
		icon: <HomeRounded fontSize="large" />,
	},
	{
		title: "Orders",
		path: "/orders",
		icon: <TimerRounded fontSize="large" />,
	},
	{
		title: "Reservations",
		path: "#",
		icon: <EventNoteRounded fontSize="large" />,
	},
	{
		title: "Menu",
		path: "/menu",
		icon: <RestaurantRounded fontSize="large" />,
	},
	{
		title: "Settings",
		path: "#",
		icon: <SettingsRounded fontSize="large" />,
	},
];

export default SidebarRoutes;
