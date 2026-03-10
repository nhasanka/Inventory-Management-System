import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api/api";

function EditPlace() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [cupboards, setCupboards] = useState([]);
  const [cupboardId, setCupboardId] = useState("");

  useEffect(() => {
    fetchPlace();
    fetchCupboards();
  }, []);

  const fetchPlace = async () => {
    const res = await API.get(`/places/${id}`);

    setName(res.data.name);
    setCode(res.data.code);
    setCupboardId(res.data.cupboard_id);
  };

  const fetchCupboards = async () => {
    const res = await API.get("/cupboards");

    setCupboards(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await API.put(`/places/${id}`, {
      name,
      code,
      cupboard_id: cupboardId,
    });

    alert("Place Updated");

    navigate("/places");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Edit Place</h3>

      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Place Name"
      />

      <input
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="Place Code"
      />

      <select
        value={cupboardId}
        onChange={(e) => setCupboardId(e.target.value)}
      >
        <option>Select Cupboard</option>

        {cupboards.map((c) => (
          <option key={c.id} value={c.id}>
            {c.name}
          </option>
        ))}
      </select>

      <button type="submit">Update</button>
    </form>
  );
}

export default EditPlace;
