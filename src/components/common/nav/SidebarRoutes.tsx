import React from "react";
import {MdRestaurantMenu} from "react-icons/md";
import {FiHome} from "react-icons/fi";
import {BiBookAdd} from "react-icons/bi";
import {BsGear} from "react-icons/bs";

const SidebarRoutes = [
	{
		title: "Home",
		path: "/",
		icon: <FiHome />,
	},
	{
		title: "Reservations",
		path: "#",
		icon: <BiBookAdd />,
	},
	{
		title: "Menu",
		path: "#",
		icon: <MdRestaurantMenu />,
	},
	{
		title: "Settings",
		path: "#",
		icon: <BsGear />,
	},
];

export default SidebarRoutes;
