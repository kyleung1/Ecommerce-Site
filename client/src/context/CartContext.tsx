import { createContext, useReducer, useEffect } from "react";
import { cartContext, Cart } from "../interfaces/cart";

export const CartContext = createContext<cartContext | null>(null);

export const CartReducer = (state: Cart, action: any) => {
  switch (action.type) {
    case "SET_CART":
      return {
        cart: action.payload,
      };
    case "ADD_CART":
      return {
        cart: [action.payload, ...state.cart],
      };
    case "REMOVE_CART":
      return {
        cart: state.cart.filter((i) => i.name !== action.payload.name),
      };

    default:
      return state;
  }
};

export const CartContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [cartState, cartDispatch] = useReducer(CartReducer, {
    cart: [],
  });

  useEffect(() => {
    const LScart = localStorage.getItem("myCart");
    let myCart;
    if (LScart) {
      myCart = JSON.parse(LScart);
    } else {
      localStorage.setItem("myCart", JSON.stringify({ cart: [] }));
    }

    if (myCart) {
      cartDispatch({ type: "SET_CART", payload: myCart });
    }
  }, []);

  return (
    <CartContext.Provider value={{ cartState, cartDispatch }}>
      {children}
    </CartContext.Provider>
  );
};
