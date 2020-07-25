import React from "react";
import { useQuery, gql, useMutation } from "@apollo/client";
import { useParams } from "react-router-dom";

import Order from "../components/order/order";
import Menu from "../components/order/menu";

const GET_ORDER = gql`
  query GetOrder($orderId: ID!) {
    order(id: $orderId) {
      id
      lines {
        id
        item {
          title
          pricePerUnit
        }
        quantity
      }
    }
  }
`;

const ADD_ITEM = gql`
  mutation addItem($orderId: ID!, $itemId: ID!, $qty: Int!) {
    createLine(orderId: $orderId, itemId: $itemId, quantity: $qty) {
      id
    }
  }
`;

export default function OrderPage() {
  const [addItem] = useMutation(ADD_ITEM);
  const { id } = useParams();

  const addToOrder = (itemId, quantity) => {
    addItem({ variables: { orderId: id, itemId: itemId, qty: quantity } });
  };

  const { data, loading, error } = useQuery(GET_ORDER, {
    variables: { orderId: id },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>ERROR: {error.message}</p>;
  if (!data.order) return <p>Not found</p>;
  return (
    <div>
      <Order data={data.order} />
      <Menu addToOrder={addToOrder} />
    </div>
  );
}
