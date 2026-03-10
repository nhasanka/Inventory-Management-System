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

      <table border="1" width="100%" cellPadding="10">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Location</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {cupboards.map((cupboard) => (
            <tr key={cupboard.id}>
              <td>{cupboard.id}</td>
              <td>{cupboard.name}</td>
              <td>{cupboard.location}</td>

              <td>
                <a href={`/cupboards/edit/${cupboard.id}`}>Edit</a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CupboardList;
