import { useItemContext } from "../hooks/useItemContext";
import { useAuthContext } from "../hooks/useAuthContext";
import { useCartContext } from "../hooks/useCartContext";
import { useEffect } from "react";
import { Item, Items } from "../interfaces/items";
import React from "react";

const LScart = localStorage.getItem("myCart");
let cartArray: Item[];
if (LScart) cartArray = JSON.parse(LScart);

const ProductDetails = ({ item }: { item: Item }) => {
  const { itemsState, itemsDispatch } = useItemContext();
  const { authState, authDispatch } = useAuthContext();
  const { cartState, cartDispatch } = useCartContext();

  //delete an item from products
  const handleDelete = async () => {
    if (!authState.user) {
      return;
    }

    const response = await fetch(
      process.env.REACT_APP_PKMART_BACKEND + "api/item/dynamic/" + item._id,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${authState.user.token}`,
          apiKey: "" + process.env.REACT_APP_APIKEY,
        },
      }
    );

    const json = await response.json();

    if (response.ok) {
      itemsDispatch({ type: "DELETE_ITEM", payload: item });
      console.log("item deleted");
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
      {authState.user && authState.user.admin === true && (
        <button onClick={handleDelete}>delete</button>
      )}
      <button onClick={handleAddCart}>Add to Cart</button>
    </div>
  );
};

export default ProductDetails;
