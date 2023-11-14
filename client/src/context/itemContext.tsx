import { createContext, useReducer } from "react";
import React from "react";
import { ItemsContext, Item, action, Items } from "../interfaces/items";

export const ItemContext = createContext<ItemsContext | null>(null);

export const itemsReducer = (state: Items, action: action) => {
  switch (action.type) {
    case "SET_ITEMS":
      return {
        items: action.payload,
      };
    case "CREATE_ITEM":
      return {
        items: [action.payload, ...state.items],
      };
    case "DELETE_ITEM":
      if (action.payload._id)
        return {
          items: state.items.filter((i: Item) => i._id !== action.payload._id),
        };
    default:
      return state;
  }
};

export const ItemContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [items, itemsDispatch] = useReducer(itemsReducer, {
    items: [],
  });

  return (
    <ItemContext.Provider value={{ items, itemsDispatch }}>
      {children}
    </ItemContext.Provider>
  );
};

// ItemContext.Provider wraps app in index.js
// The value is what in the ItemContext.Provider is available in other components
// useReducer() takes reducer function and initial value for state
// dispatch({type: "SET_ITEMS", payload: data to make the change}) is used to update the state of reducer
// itemsReducer = (state, action), state is the previous state before change and action is the object that was passed into dispatch {type: , payload:}
// ...state,  the spread operator (...) allows an iterable object (such as an array or an object) to be expanded into its individual elements.
