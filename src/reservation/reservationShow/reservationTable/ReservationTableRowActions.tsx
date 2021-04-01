import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import {
	IconButton,
	ListItemIcon,
	MenuItem,
	Menu,
	ListItemText,
} from "@material-ui/core";
import CreateIcon from "@material-ui/icons/Create";
import PriorityHighIcon from "@material-ui/icons/PriorityHigh";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import MoreIcon from "@material-ui/icons/More";

import ReservationDelete from "./ReservationDelete";

export const ReservationTableRowActions = ({ res }) => {
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<>
			<IconButton
				aria-label="actions"
				aria-controls="actions-menu"
				aria-haspopup="true"
				onClick={handleClick}>
				<MoreVertIcon />
			</IconButton>
			<Menu
				id="actions-menu"
				anchorEl={anchorEl}
				keepMounted
				open={Boolean(anchorEl)}
				onClose={handleClose}
				getContentAnchorEl={null}
				anchorOrigin={{
					vertical: "top",
					horizontal: "right",
				}}
				transformOrigin={{
					vertical: "top",
					horizontal: "left",
				}}>
				<StyledLink to={`/reservation/info/${res.id}`}>
					<MenuItem>
						<ListItemIcon aria-label="reservation details">
							<MoreIcon />
						</ListItemIcon>
						<ListItemText primary="Details" />
					</MenuItem>
				</StyledLink>

				<StyledLink to={`/reservation/edit/${res.id}`}>
					<MenuItem>
						<ListItemIcon aria-label="edit">
							<CreateIcon />
						</ListItemIcon>
						<ListItemText primary="Edit" />
					</MenuItem>
				</StyledLink>

				<ReservationDelete res={res} />

				<MenuItem>
					<ListItemIcon>
						<PriorityHighIcon />
					</ListItemIcon>
					<ListItemText primary="Confirm" />
				</MenuItem>
			</Menu>
		</>
	);
};

const StyledLink = styled(Link)`
	text-decoration: none;
	color: inherit;
`;
