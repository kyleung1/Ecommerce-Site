import { useItemContext } from "../hooks/useItemContext";
import { useAuthContext } from "../hooks/useAuthContext";
import { useCartContext } from "../hooks/useCartContext";
import { useEffect } from "react";
import React from "react";
var cartArray = JSON.parse(localStorage.getItem("myCart"));

const ProductDetails = ({ item }) => {
  const { dispatch } = useItemContext();
  const { user } = useAuthContext();
  const { cartDispatch } = useCartContext();

  useEffect(() => {
    if (cartArray && cartArray.length > 0) {
      localStorage.setItem("myCart", JSON.stringify(cartArray));
      cartArray = JSON.parse(localStorage.getItem("myCart"));
      cartDispatch({ type: "SET_CART", payload: cartArray });
      console.log(cartArray);
    }
  }, []);

  //delete an item from products
  const handleDelete = async () => {
    if (!user) {
      return;
    }

    const response = await fetch(
      "http://localhost:" + process.env.REACT_APP_PORT + "/item/" + item._id,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );

    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_ITEM", payload: json });
    }
  };

  //add item to cart
  const handleAddCart = async () => {
    if (cartArray) {
      cartArray.push(item);
      localStorage.setItem("myCart", JSON.stringify(cartArray));

      cartDispatch({ type: "ADD_CART", payload: cartArray });
      console.log({ item } + " added to cart");
    }
  };

  return (
    <div className="product-details">
      <h4>{item.name}</h4>
      <p>
        <strong>Price: $</strong>
        {item.price.toFixed(2)}
      </p>
      <img
        src={require("../images/" + item.name + ".webp")}
        className="item_images"
      />
      <br></br>
      <p className="product-desription">{item.desc}</p>
      {user && user.admin === true && (
        <button onClick={handleDelete}>delete</button>
      )}
      <button onClick={handleAddCart}>Add to Cart</button>
    </div>
  );
};

export default ProductDetails;
