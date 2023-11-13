import { useEffect } from "react";
import { useItemContext } from "../hooks/useItemContext";
import { useAuthContext } from "../hooks/useAuthContext";

//components
import ProductDetails from "../components/ProductDetails";
import React from "react";
import Items from "../interfaces/items";

const Products = () => {
  //const [items, setItems] = useState(null)
  const { items, dispatch } = useItemContext();
  const { user } = useAuthContext;

  useEffect(() => {
    const fetchItems = async () => {
      const response = await fetch(
        "http://localhost:" + process.env.REACT_APP_PORT + "/item2"
      );
      const json = await response.json();

      if (response.ok) {
        // setItems(json)
        dispatch({ type: "SET_ITEMS", payload: json });
      }
    };

    fetchItems();
  }, []);

  return (
    <div className="products">
      <h2>Products page</h2>
      <div className="product_items">
        {/* {items && items.map((item) => (
                    <ProductDetails key = {item._id} item = {item}/>
                ))} */}
      </div>
    </div>
  );
};

export default Products;
