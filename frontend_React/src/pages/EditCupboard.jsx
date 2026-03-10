import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api/api";

function EditCupboard() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [location, setLocation] = useState("");

  useEffect(() => {
    API.get(`/cupboards/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }).then((res) => {
      setName(res.data.name);
      setLocation(res.data.location);
    });
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await API.put(
      `/cupboards/${id}`,
      {
        name,
        location,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      },
    );

    navigate("/cupboards");
  };

  return (
    <div>
      <h2>Edit Cupboard</h2>

      <form onSubmit={handleSubmit}>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Cupboard name"
        />

        <input
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Location"
        />

        <button type="submit">Update</button>
      </form>
    </div>
  );
}

export default EditCupboard;
