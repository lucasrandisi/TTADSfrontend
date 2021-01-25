import React, { useState } from "react";
import { useQuery, gql } from "@apollo/client";
import styled from "styled-components";
import { Button, Dialog, DialogActions, DialogContent } from "@material-ui/core";
import NumberInput from "../common/NumberIntput";

const GET_ITEMS = gql`
	query {
		items {
			id
			title
			desc
			pricePerUnit
		}
	}
`;

interface Item {
	id: Number;
	title: String;
}

const Menu = ({ addToOrder }) => {
	const [open, setOpen] = useState(false);
	const [selected, setItem] = useState<Item>();
	const [count, setCount] = useState(0);
	const { data, loading, error } = useQuery(GET_ITEMS);

	const handleClickOpen = item => {
		setOpen(true);
		setItem(item);
	};

	const handleClose = () => {
		setOpen(false);
		setCount(0);
	};

	const add = () => {
		addToOrder(selected!.id, count);
		handleClose();
	};

	const handleChange = value => {
		setCount(value);
	};

	return (
		<Container>
			{!loading && !error && data && (
				<MenuGrid>
					{data.items.map(item => (
						<button key={item.id} type="button" onClick={() => handleClickOpen(item)}>
							{item.title}
						</button>
					))}
				</MenuGrid>
			)}

			<Dialog open={open} onClose={handleClose}>
				<DialogContent>
					Cantidad: <NumberInput onChange={handleChange} />
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose} color="primary">
						Cancelar
					</Button>
					<Button onClick={add} disabled={count === 0} color="primary">
						Añadir
					</Button>
				</DialogActions>
			</Dialog>
		</Container>
	);
};

export default Menu;

const MenuGrid = styled.div`
	padding: 5px;
	display: grid;
	grid-template-columns: repeat(8, 1fr);
	column-gap: 5px;
	row-gap: 5px;
`;

const Container = styled.div`
	margin: 0 1.5rem;
`;
