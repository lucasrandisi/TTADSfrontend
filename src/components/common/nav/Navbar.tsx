import React from "react";
import {Link} from "react-router-dom";
import styled from "styled-components";

import SidebarRoutes from "./SidebarRoutes";

const Navbar = () => {
	return (
		<Sidebar>
			<ul>
				{SidebarRoutes.map((item) => (
					<Route key={item.title}>
						<TabLink to={item.path}>
							{item.icon}
							<span>{item.title}</span>
						</TabLink>
					</Route>
				))}
			</ul>
		</Sidebar>
	);
};
export default Navbar;

const TabLink = styled(Link)`
	margin-left: 0.75rem;
	font-size: 2rem;
	background: none;

	span {
		margin-left: 16px;
	}
`;

const Sidebar = styled.nav`
	background-color: #060b26;
	width: 235px;
	height: 100vh;
	display: flex;
	justify-content: center;
	top: 0;
	left: -100%;
	transition: 850ms;

	ul {
		width: 100%;
	}
`;

const Route = styled.li`
	display: flex;
	justify-content: start;
	align-items: center;
	list-style: none;
	height: 60px;

	a {
		text-decoration: none;
		color: #f5f5f5;
		font-size: x-large;
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		padding: 0 16px;
		border-radius: 4px;
	}

	a:hover {
		background-color: #2185d0;
	}
`;
