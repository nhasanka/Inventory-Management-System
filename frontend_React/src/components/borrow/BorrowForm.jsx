import { useState, useEffect } from "react";
import API from "../../api/api";
import "../../styles/borrowForm.css";

function BorrowForm() {
  const [itemId, setItemId] = useState("");
  const [borrowerName, setBorrowerName] = useState("");
  const [contactDetails, setContactDetails] = useState("");
  const [borrowDate, setBorrowDate] = useState("");
  const [expectedReturnDate, setExpectedReturnDate] = useState("");
  const [quantity, setQuantity] = useState("");

  const [items, setItems] = useState([]);

  useEffect(() => {
    API.get("/items").then((res) => {
      setItems(res.data);
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await API.post("/borrowings", {
      item_id: itemId,
      borrower_name: borrowerName,
      contact_details: contactDetails,
      borrow_date: borrowDate,
      expected_return_date: expectedReturnDate,
      quantity: quantity,
    });

    alert("Item Borrowed");
  };

  return (
    <form onSubmit={handleSubmit} className="form-card borrow-form">
      <h3>Borrow Item</h3>

      <select onChange={(e) => setItemId(e.target.value)}>
        <option>Select Item</option>

        {items.map((item) => (
          <option key={item.id} value={item.id}>
            {item.name} (Stock: {item.quantity})
          </option>
        ))}
      </select>

      <input
        placeholder="Borrower Name"
        onChange={(e) => setBorrowerName(e.target.value)}
      />

      <input
        placeholder="Contact Details"
        onChange={(e) => setContactDetails(e.target.value)}
      />

      <div className="form-group">
        <label>Borrow Date</label>
        <input type="date" onChange={(e) => setBorrowDate(e.target.value)} />
      </div>

      <div className="form-group">
        <label>Expected Return Date</label>
        <input
          type="date"
          onChange={(e) => setExpectedReturnDate(e.target.value)}
        />
      </div>

      <input
        type="number"
        placeholder="Quantity"
        onChange={(e) => setQuantity(e.target.value)}
      />

      <button>Borrow Item</button>
    </form>
  );
}

export default BorrowForm;
