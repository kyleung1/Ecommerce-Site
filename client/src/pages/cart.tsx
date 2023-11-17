import { useCartContext } from "../hooks/useCartContext";
import { useItemContext } from "../hooks/useItemContext";
import { useEffect } from "react";

//components
import CartDetails from "../components/CartDetails";
import { Item } from "../interfaces/items";
import { Amount } from "../interfaces/cart";

var cartArray: Item[] = [];

const Cart = () => {
  const { cartState, cartDispatch } = useCartContext();
  const { itemsState, itemsDispatch } = useItemContext();

  const handleClear = async () => {
    localStorage.setItem("myCart", JSON.stringify(cartArray));
    const LScart = localStorage.getItem("myCart");
    if (LScart) cartArray = JSON.parse(LScart);
    cartDispatch({ type: "SET_CART", payload: cartArray });
  };

  const handleCheckout = async () => {
    fetch(
      "http://localhost:" +
        process.env.REACT_APP_PORT +
        "/create-checkout-session",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: [
            { id: "631050fc59211e6e12ca98be", quantity: 1 },
            { id: "631050c159211e6e12ca98b3", quantity: 2 },
          ],
        }),
      }
    )
      .then((res) => {
        if (res.ok) return res.json();
        return res.json().then((json) => Promise.reject(json));
      })
      .then(({ url }) => {
        window.location = url;
      })
      .catch((e) => {
        console.error(e.error);
      });
  };

  //gets items from db
  useEffect(() => {
    const fetchItems = async () => {
      const response = await fetch(
        "http://localhost:" + process.env.REACT_APP_PORT + "/item2"
      );
      const json = await response.json();

      if (response.ok) {
        itemsDispatch({ type: "SET_ITEMS", payload: json });
      }
    };

    fetchItems();
  }, []);

  //calculates total amount
  let subTotal = 0;
  for (let i = 0; i < cartState.cart?.length; i++) {
    subTotal += cartState.cart[i].price;
  }

  //keeping track of quantities of items
  var sortedCart = cartState.cart?.sort();

  if (sortedCart?.length > 0) {
    var amount = [];

    for (let i = 0; i < itemsState.items?.length; i++) {
      let counter = 0;
      for (let j = 0; j < sortedCart?.length; j++) {
        if (sortedCart[j]?.name === itemsState.items[i]?.name) {
          counter++;
        }
      }
      let amountObj = { name: itemsState.items[i]?.name, quantity: counter };
      amount.push(amountObj);
    }
  }

  return (
    <div>
      <h2>Cart page</h2>
      <p>
        The checkout is in test mode, please see{" "}
        <a href="https://stripe.com/docs/testing#cards">Stripe Testing Cards</a>{" "}
        to simulate a checkout.
      </p>
      <button onClick={handleCheckout}>Checkout</button>
      <button onClick={handleClear}>Clear Cart</button>
      <div className="cart-map">
        {amount &&
          amount.map((itemAmt: Amount) => (
            <CartDetails key={itemAmt.name as React.Key} itemAmt={itemAmt} />
          ))}
      </div>
      <h3>Sub-Total: ${subTotal.toFixed(2)} </h3>
    </div>
  );
};

export default Cart;
