import React from "react";

export interface Item {
  _id: string;
  name: string;
  price: number;
  stock: number;
  __v: number;
  desc: string;
}

export type action = SetItemsAction | CreateItemAction | DeleteItemAction;

export interface ItemsContext {
  itemsState: Items;
  itemsDispatch: React.Dispatch<action>;
}

export interface Items {
  items: Item[];
}

export interface SetItemsAction {
  type: "SET_ITEMS";
  payload: Item[];
}

export interface CreateItemAction {
  type: "CREATE_ITEM";
  payload: Item;
}

export interface DeleteItemAction {
  type: "DELETE_ITEM";
  payload: { _id?: string };
}
