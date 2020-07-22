import React from "react";
import { useQuery, gql } from "@apollo/client";
import { useParams } from "react-router-dom";
import Order from "./order";

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

export default function OrderContainer() {
  const { id } = useParams();
  const { data, loading, error } = useQuery(GET_ORDER, {
    variables: { orderId: id },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>ERROR: {error.message}</p>;
  return data.order ? <Order data={data.order} /> : <p>Not found</p>;
}
