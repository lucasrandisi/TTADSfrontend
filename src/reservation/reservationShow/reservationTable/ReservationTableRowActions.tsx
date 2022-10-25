import React, {useState} from "react";
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
import DeleteIcon from "@material-ui/icons/Delete";
import PriorityHighIcon from "@material-ui/icons/PriorityHigh";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import MoreIcon from "@material-ui/icons/More";

import ReservationCancelModal from "./ReservationCancelModal";
import ReservationEdit from "./ReservationEdit";

export const ReservationTableRowActions = ({ res }) => {
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

	const [childrenModal, setChildrenModal] = useState<any>(null);

	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleModal = (type) => {
		switch (type) {
			case "cancel":
				setChildrenModal(
					<ReservationCancelModal 
						idReservation={res.id}
						setChildrenModal={setChildrenModal}
					/>)
				break;
			case "edit":
				setChildrenModal(
					<ReservationEdit 
						res={res} 
						setChildrenModal={setChildrenModal}
					/>)
				break;
			default:
				break;
		}
	}

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
				{
					!res.cancelationDateTime && 
					<>
						<MenuItem onClick={() => handleModal("edit")}>
							<ListItemIcon aria-label="edit">
								<CreateIcon />
							</ListItemIcon>
							<ListItemText primary="Edit" />
						</MenuItem>
						<MenuItem onClick={() => handleModal("cancel")}>
							<ListItemIcon aria-label="cancel">
								<DeleteIcon />
							</ListItemIcon>
							<ListItemText primary="Cancel" />
						</MenuItem>
					</>
				}
			</Menu>

			{childrenModal}
		</>
	);
};

const StyledLink = styled(Link)`
	text-decoration: none;
	color: inherit;
`;
