import React from "react";
import { Item } from "./items";

export interface cartContext {
  cartState: Cart;
  cartDispatch: React.Dispatch<any>;
}

export interface Cart {
  cart: Item[];
}

export interface SetItemsAction {
  type: "SET_CART";
  payload: Item[];
}

export interface CreateItemAction {
  type: "ADD_CART";
  payload: Item;
}

export interface DeleteItemAction {
  type: "REMOVE_CART";
  payload: { name?: string };
}

export interface Amount {
  id: string;
  name: string;
  quantity: number;
}
