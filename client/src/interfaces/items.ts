import React from "react";

export default interface Items {
  _id: String;
  name: String;
  price: number;
  stock: number;
  __v: number;
  desc: String;
}

export default interface ItemsContext {
  items: Items[];
  dispatch: React.Dispatch<any>;
}
