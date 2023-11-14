import { useCartContext } from "../hooks/useCartContext";
import { useItemContext } from "../hooks/useItemContext";
import { useEffect, useState } from "react";

const LScart = localStorage.getItem("myCart");
let cartArray: JSON;
if (LScart) cartArray = JSON.parse(LScart);

const CartDetails = ({ a }) => {
  const { cart, cartDispatch } = useCartContext();
  const { items, dispatch } = useItemContext();
  const [CurrentQ, setQuantity] = useState(a.quantity);

  const handleRemove = async () => {
    cartArray = cartArray.filter((b) => b.name != a.name);
    if (cartArray) {
      localStorage.setItem("myCart", JSON.stringify(cartArray));
      cartDispatch({ type: "SET_CART", payload: cartArray });
    }
    console.log({ a } + "removed from");
  };

  const updateCart = async (e) => {
    setQuantity(e);
    // useEffect(() => {
    //    handleQuantity();
    // }, [CurrentQ])
  };

  const handleQuantity = async (e) => {
    // useEffect(() => {
    setQuantity(e);
    // }, []);
    const tempE = e;
    const tempName = a.name;
    let onlyItemA = cartArray.filter((b) => b.name == a.name);
    let notItemA = cartArray.filter((b) => b.name != a.name);
    while (onlyItemA.length != tempE) {
      if (onlyItemA.length > tempE) {
        onlyItemA.pop();
      } else {
        for (let i = 0; i < items.length; i++) {
          if (tempName == items[i].name) {
            onlyItemA.push(items[i]);
          }
        }
      }
    }
    cartArray = notItemA.concat(onlyItemA);
    localStorage.setItem("myCart", JSON.stringify(cartArray));
    cartDispatch({ type: "SET_CART", payload: cartArray });
  };

  let price = 0;
  for (let i = 0; i < items?.length; i++) {
    if (a.name == items[i].name) {
      price = items[i].price;
    }
  }

  return (
    <div className="cart-details">
      {a && a.quantity > 0 && (
        <div>
          <h3>{a.name}</h3>

          <label>Quantity: </label>
          <select onChange={(e) => handleQuantity(e.target.value)}>
            <option value={a.quantity}>{a.quantity}</option>
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
            src={require("../images/" + a.name + ".webp")}
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
