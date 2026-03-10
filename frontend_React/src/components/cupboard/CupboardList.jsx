import { useEffect, useState } from "react";
import API from "../../api/api";

function CupboardList() {
  const [cupboards, setCupboards] = useState([]);

  const fetchCupboards = async () => {
    const res = await API.get("/cupboards", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    setCupboards(res.data);
  };

  useEffect(() => {
    fetchCupboards();
  }, []);

  return (
    <div>
      <h2>Cupboards</h2>

      <ul>
        {cupboards.map((c) => (
          <li key={c.id}>
            {c.name} - {c.location}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CupboardList;
