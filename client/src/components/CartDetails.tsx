import { useCartContext } from "../hooks/useCartContext";
import { useItemContext } from "../hooks/useItemContext";
import { useEffect, useState } from "react";
import { Item } from "../interfaces/items";
import { Amount } from "../interfaces/cart";

const LScart = localStorage.getItem("myCart");
let cartArray: Item[];
if (LScart) cartArray = JSON.parse(LScart);

const CartDetails = ({ itemAmt }: { itemAmt: Amount }) => {
  const { cartState, cartDispatch } = useCartContext();
  const { itemsState, itemsDispatch } = useItemContext();
  const [CurrentQ, setQuantity] = useState(itemAmt.quantity);

  const handleRemove = async () => {
    cartArray = cartArray.filter(
      (cartItem: Item) => cartItem.name != itemAmt.name
    );
    if (cartArray) {
      localStorage.setItem("myCart", JSON.stringify(cartArray));
      cartDispatch({ type: "SET_CART", payload: cartArray });
    }
    console.log({ itemAmt } + "removed from");
  };

  const updateCart = async (e: number) => {
    setQuantity(e);
    // useEffect(() => {
    //    handleQuantity();
    // }, [CurrentQ])
  };

  const handleQuantity = async (e: string) => {
    // useEffect(() => {
    setQuantity(Number(e));
    // }, []);
    const tempE = Number(e);
    const tempName = itemAmt.name;
    let onlyItemA = cartArray.filter(
      (cartItem) => cartItem.name == itemAmt.name
    );
    let notItemA = cartArray.filter(
      (cartItem) => cartItem.name != itemAmt.name
    );
    while (onlyItemA.length != tempE) {
      if (onlyItemA.length > tempE) {
        onlyItemA.pop();
      } else {
        for (let i = 0; i < itemsState.items.length; i++) {
          if (tempName == itemsState.items[i].name) {
            onlyItemA.push(itemsState.items[i]);
          }
        }
      }
    }
    cartArray = notItemA.concat(onlyItemA);
    localStorage.setItem("myCart", JSON.stringify(cartArray));
    cartDispatch({ type: "SET_CART", payload: cartArray });
  };

  let price = 0;
  for (let i = 0; i < itemsState?.items.length; i++) {
    if (itemAmt.name == itemsState.items[i].name) {
      price = itemsState.items[i].price;
    }
  }

  return (
    <div className="cart-details">
      {itemAmt && itemAmt.quantity > 0 && (
        <div>
          <h3>{itemAmt.name}</h3>

          <label>Quantity: </label>
          <select onChange={(e) => handleQuantity(e.target.value)}>
            <option value={itemAmt.quantity}>{itemAmt.quantity}</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
          </select>
          <p>
            <strong>Price: $</strong> {price.toFixed(2)}{" "}
          </p>
          <img
            src={require("../images/" + itemAmt.name + ".webp")}
            className="item_images"
          />
          <br></br>
          <button onClick={handleRemove}>Delete</button>
        </div>
      )}
    </div>
  );
};

export default CartDetails;
