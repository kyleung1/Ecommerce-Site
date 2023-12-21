import { useEffect } from "react";
import { useItemContext } from "../hooks/useItemContext";
import { useAuthContext } from "../hooks/useAuthContext";

//components
import ProductDetails from "../components/ProductDetails";
import React from "react";
import { Item } from "../interfaces/items";

const Products = () => {
  //const [items, setItems] = useState(null)
  const { itemsState, itemsDispatch } = useItemContext();
  // const { user } = useAuthContext;

  useEffect(() => {
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
  }, []);

  return (
    <div className="products">
      <h2>Products page</h2>
      <div className="product_items">
        {itemsState.items &&
          itemsState.items.map((item: Item) => (
            <ProductDetails key={item._id as React.Key} item={item} />
          ))}
      </div>
    </div>
  );
};

export default Products;
