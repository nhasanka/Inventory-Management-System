import { useEffect, useState } from "react";
import API from "../../api/api";

function BorrowList() {
  const [borrowings, setBorrowings] = useState([]);

  useEffect(() => {
    fetchBorrowings();
  }, []);

  const fetchBorrowings = () => {
    API.get("/borrowings").then((res) => {
      setBorrowings(res.data);
    });
  };

  const returnItem = async (id) => {
    await API.post(`/borrowings/${id}/return`);

    alert("Item Returned");

    fetchBorrowings();
  };

  return (
    <table border="1">
      <thead>
        <tr>
          <th>Item</th>
          <th>Borrower</th>
          <th>Contact</th>
          <th>Quantity</th>
          <th>Borrow Date</th>
          <th>Expected Return</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
      </thead>

      <tbody>
        {borrowings.map((b) => (
          <tr key={b.id}>
            <td>{b.item?.name}</td>
            <td>{b.borrower_name}</td>
            <td>{b.contact_details}</td>
            <td>{b.quantity}</td>
            <td>{b.borrow_date}</td>
            <td>{b.expected_return_date}</td>
            <td>{b.status}</td>

            <td>
              {b.status === "borrowed" && (
                <button onClick={() => returnItem(b.id)}>Return</button>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default BorrowList;
