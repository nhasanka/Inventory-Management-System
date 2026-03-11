import PlacesForm from "../components/place/PlaceForm";
import PlacesList from "../components/place/PlacesList";
function Places() {
  return (
    <div>
      <h2>Places Management</h2>
      <PlacesForm />
      <PlacesList />
    </div>
  );
}

export default Places;
