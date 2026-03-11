import { useEffect, useState } from "react";
import API from "../../api/api";

function PlacesList() {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    fetchPlaces();
  }, []);

  const fetchPlaces = async () => {
    const res = await API.get("/places");
    setPlaces(res.data);
  };

  return (
    <table border="1" width="100%" cellPadding="10">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Code</th>
          <th>Cupboard</th>
          <th>Action</th>
        </tr>
      </thead>

      <tbody>
        {places.map((place) => (
          <tr key={place.id}>
            <td>{place.id}</td>
            <td>{place.name}</td>
            <td>{place.code}</td>
            <td>{place.cupboard?.name}</td>
            <td>
              <a href={`/places/edit/${place.id}`}>Edit</a>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default PlacesList;
