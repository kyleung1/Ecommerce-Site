import { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useItemContext } from "../hooks/useItemContext";

//components
import ItemForm from "../components/ItemForm";
import ProductDetails from "../components/ProductDetails";

const Admin = () => {
  const { itemsState, itemsDispatch } = useItemContext();
  const { authState } = useAuthContext();

  useEffect(() => {
    const fetchItems = async () => {
      const response = await fetch(
        "http://localhost:" + process.env.REACT_APP_PORT + "/item2"
      );
      const json = await response.json();

      if (response.ok) {
        // setItems(json)
        itemsDispatch({ type: "SET_ITEMS", payload: json });
      }
    };

    fetchItems();
  }, []);

  return (
    <div className="AdminPage">
      <h2>Admin page</h2>
      <div className="product_items">
        {itemsState.items &&
          itemsState.items.map((item) => (
            <ProductDetails key={item._id as React.Key} item={item} />
          ))}
      </div>

      <div>
        <ItemForm />
      </div>
    </div>
  );
};

export default Admin;
