import { useState, useEffect } from "react";
import API from "../../api/api";
import "../../styles/itemForm.css";

function ItemForm() {
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [quantity, setQuantity] = useState("");
  const [serialNumber, setSerialNumber] = useState("");
  const [description, setDescription] = useState("");
  const [placeId, setPlaceId] = useState("");
  const [status, setStatus] = useState("In-Store");
  const [image, setImage] = useState(null);
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    API.get("/places").then((res) => {
      setPlaces(res.data);
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await API.post("/items", {
      name,
      code,
      quantity,
      serial_number: serialNumber,
      description,
      place_id: placeId,
      status,
      image,
    });

    alert("Item Created");
  };

  return (
    <form onSubmit={handleSubmit} className="form-card item-form">
      <input
        placeholder="Item Name"
        onChange={(e) => setName(e.target.value)}
      />

      <input placeholder="Code" onChange={(e) => setCode(e.target.value)} />

      <input
        type="number"
        placeholder="Quantity"
        onChange={(e) => setQuantity(e.target.value)}
      />

      <input
        placeholder="Serial Number"
        onChange={(e) => setSerialNumber(e.target.value)}
      />

      <select onChange={(e) => setPlaceId(e.target.value)}>
        <option>Select Place</option>

        {places.map((p) => (
          <option key={p.id} value={p.id}>
            {p.name}
          </option>
        ))}
      </select>

      <select onChange={(e) => setStatus(e.target.value)}>
        <option>In-Store</option>
        <option>Borrowed</option>
        <option>Damaged</option>
        <option>Missing</option>
      </select>

      <input type="file" onChange={(e) => setImage(e.target.files[0])} />

      <textarea
        placeholder="Description"
        onChange={(e) => setDescription(e.target.value)}
      ></textarea>

      <button type="submit">Create Item</button>
    </form>
  );
}

export default ItemForm;
