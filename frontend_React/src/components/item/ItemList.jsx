import { useEffect, useState } from "react";
import API from "../../api/api";

function ItemList() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    const res = await API.get("/items");
    setItems(res.data);
  };

  const incrementQty = async (id) => {
    await API.post(`/items/${id}/increment`);
    fetchItems();
  };

  const decrementQty = async (id) => {
    await API.post(`/items/${id}/decrement`);
    fetchItems();
  };

  return (
    <div>
      <h2>Items List</h2>

      <table border="1" width="100%" cellPadding="10">
        <thead>
          <tr>
            <th>ID</th>
            <th>Image</th>
            <th>Name</th>
            <th>Code</th>
            <th>Quantity</th>
            <th>Status</th>
            <th>Place</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>

              <td>
                {item.image && (
                  <img
                    src={`http://localhost:8000/storage/${item.image}`}
                    width="50"
                  />
                )}
              </td>

              <td>{item.name}</td>

              <td>{item.code}</td>

              <td>
                <button onClick={() => decrementQty(item.id)}>-</button>

                {item.quantity}

                <button onClick={() => incrementQty(item.id)}>+</button>
              </td>

              <td>{item.status}</td>

              <td>{item.place?.name}</td>

              <td>
                <a href={`/items/edit/${item.id}`}>
                  <button>Edit</button>
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ItemList;
