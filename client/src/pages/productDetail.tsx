import { useParams } from "react-router-dom";
import { useItemContext } from "../hooks/useItemContext";
import { useEffect, useState } from "react";

// product details page
const ProductDetails = () => {
  const { id } = useParams();
  const { itemsState, itemsDispatch } = useItemContext();

  useEffect(() => {
    if (itemsState.items.length == 0) {
      const fetchItems = async () => {
        const response = await fetch(
          process.env.REACT_APP_PKMART_BACKEND + "api/item"
        );
        const json = await response.json();

        if (response.ok) {
          // setItems(json)
          itemsDispatch({ type: "SET_ITEMS", payload: json });
        }
      };

      fetchItems();
    }
  }, []);

  console.log(itemsState);
  const ITEM =
    typeof id === "string" && itemsState.items.find((item) => item.name === id);

  return (
    <div>
      <p>this is the product detail page of {id}</p>
      <p>{ITEM && ITEM.desc}</p>
    </div>
  );
};
export default ProductDetails;
