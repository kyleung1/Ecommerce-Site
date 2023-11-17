import { useState } from "react";
import { useItemContext } from "../hooks/useItemContext";
import { useAuthContext } from "../hooks/useAuthContext";

const ItemForm = () => {
  const { itemsDispatch } = useItemContext();
  const { authState } = useAuthContext();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [desc, setDesc] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!authState.user) {
      setError("You must be logged in");
      return;
    }

    const item = { name, price, stock, desc };

    const response = await fetch(
      "http://localhost:" + process.env.REACT_APP_PORT + "/item",
      {
        method: "POST",
        body: JSON.stringify(item),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authState.user.token}`,
        },
      }
    );
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
    }
    if (response.ok) {
      setName("");
      setPrice("");
      setStock("");
      setDesc("");
      setError(null);
      console.log("new item added");
      itemsDispatch({ type: "CREATE_ITEM", payload: json });
    }
  };

  return (
    <form className="create-Item" onSubmit={handleSubmit}>
      <h3> Add a new Item </h3>

      <label>Item name:</label>
      <input
        type="text"
        onChange={(e) => setName(e.target.value)}
        value={name}
      />

      <label>Item price:</label>
      <input
        type="text"
        onChange={(e) => setPrice(e.target.value)}
        value={price}
      />

      <label>Item stock:</label>
      <input
        type="text"
        onChange={(e) => setStock(e.target.value)}
        value={stock}
      />

      <label>Item description:</label>
      <input
        type="text"
        onChange={(e) => setDesc(e.target.value)}
        value={desc}
      />
      <button>Add Item</button>
      {error && <div className="item-error">{error}</div>}
    </form>
  );
};

export default ItemForm;
