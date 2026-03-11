import { useState, useEffect } from "react";
import API from "../../api/api";
import "../../styles/placeForm.css";
function PlaceForm() {
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [cupboards, setCupboards] = useState([]);
  const [cupboardId, setCupboardId] = useState("");

  useEffect(() => {
    API.get("/cupboards").then((res) => {
      setCupboards(res.data);
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await API.post("/places", {
      name,
      code,
      cupboard_id: cupboardId,
    });

    alert("Place Created");
  };

  return (
    <form onSubmit={handleSubmit} className="form-card">
      <h3>Create Place</h3>

      <input
        placeholder="Place Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        placeholder="Place Code"
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />

      <select onChange={(e) => setCupboardId(e.target.value)}>
        <option>Select Cupboard</option>

        {cupboards.map((c) => (
          <option key={c.id} value={c.id}>
            {c.name}
          </option>
        ))}
      </select>

      <button type="submit">Save</button>
    </form>
  );
}

export default PlaceForm;
