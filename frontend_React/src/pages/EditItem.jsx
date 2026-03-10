import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api/api";

function EditItem() {
  const { id } = useParams();
  const navigate = useNavigate();

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
    fetchItem();
    fetchPlaces();
  }, []);

  const fetchItem = async () => {
    const res = await API.get(`/items/${id}`);

    setName(res.data.name);
    setCode(res.data.code);
    setQuantity(res.data.quantity);
    setSerialNumber(res.data.serial_number);
    setDescription(res.data.description);
    setPlaceId(res.data.place_id);
    setStatus(res.data.status);
  };

  const fetchPlaces = async () => {
    const res = await API.get("/places");
    setPlaces(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await API.put(`/items/${id}`, {
      name,
      code,
      quantity,
      serial_number: serialNumber,
      description,
      place_id: placeId,
      status,
    });

    alert("Item Updated");

    navigate("/items");
  };

  return (
    <div>
      <h2>Edit Item</h2>

      <form onSubmit={handleSubmit}>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Item Name"
        />

        <input
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Code"
        />

        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          placeholder="Quantity"
        />

        <input
          value={serialNumber || ""}
          onChange={(e) => setSerialNumber(e.target.value)}
          placeholder="Serial Number"
        />

        <select value={placeId} onChange={(e) => setPlaceId(e.target.value)}>
          <option value="">Select Place</option>

          {places.map((place) => (
            <option key={place.id} value={place.id}>
              {place.name}
            </option>
          ))}
        </select>

        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option>In-Store</option>
          <option>Borrowed</option>
          <option>Damaged</option>
          <option>Missing</option>
        </select>

        <input type="file" onChange={(e) => setImage(e.target.files[0])} />

        <textarea
          value={description || ""}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
        />

        <button type="submit">Update Item</button>
      </form>
    </div>
  );
}

export default EditItem;
