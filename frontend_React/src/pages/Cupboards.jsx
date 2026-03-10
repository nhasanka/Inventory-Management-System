import CupboardForm from "../components/cupboard/CupboardForm";
import CupboardList from "../components/cupboard/CupboardList";
function Cupboards() {
  return (
    <div>
      <h1>Cupboard Management</h1>
      <CupboardForm />
      <CupboardList />
    </div>
  );
}

export default Cupboards;
