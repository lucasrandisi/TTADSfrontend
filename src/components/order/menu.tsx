import React from "react";
import { useQuery, gql } from "@apollo/client";

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

const Menu = ({ addToOrder }) => {
  const { data, loading, error } = useQuery(GET_ITEMS);
  return (
    <div>
      {!loading && !error && data && (
        <div>
          {data.items.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => addToOrder(item.id, 2)}
            >
              {item.title}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Menu;
