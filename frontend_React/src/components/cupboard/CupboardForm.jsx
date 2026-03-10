import { useState } from "react";
import API from "../../api/api";

function CupboardForm({ fetchCupboards }) {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await API.post(
      "/cupboards",
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

    setName("");
    setLocation("");
    fetchCupboards();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Cupboard Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        placeholder="Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />

      <button type="submit">Save</button>
    </form>
  );
}

export default CupboardForm;
