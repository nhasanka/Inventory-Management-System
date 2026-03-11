import React from "react";
import BorrowForm from "../components/borrow/BorrowForm";
import BorrowList from "../components/borrow/BorrowList";
function Borrow() {
  return (
    <div>
      <h1>Borrowing System</h1>
      <BorrowForm />
      <BorrowList />
    </div>
  );
}

export default Borrow;
