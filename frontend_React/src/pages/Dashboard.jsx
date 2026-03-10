import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import Tile from "../components/Tile/Tile";
import "./style.css";

function Dashboard() {
  const { user } = useContext(AuthContext);
  const isAdmin = user?.role === "admin";
  const userName = user?.name || "User";

  return (
    <div className="dashboard">
      <h2>Inventory Dashboard</h2>
      {userName && <p>Welcome, {userName}!</p>}

      <div className="grid">
        {isAdmin ? (
          <Tile
            title="User Management"
            description="Manage system users"
            link="/users"
          />
        ) : (
          <p className="error">Only admins can access user management.</p>
        )}
        <Tile
          title="Cupboards"
          description="Manage cupboards"
          link="/cupboards"
        />

        <Tile
          title="Places"
          description="Manage storage places"
          link="/places"
        />

        <Tile
          title="Items"
          description="Manage inventory items"
          link="/items"
        />

        <Tile
          title="Borrowing"
          description="Borrow and return items"
          link="/borrowings"
        />
        {isAdmin ? (
          <Tile
            title="Activity Logs"
            description="View system activity"
            link="/logs"
          />
        ) : (
          <p className="error">Only admins can access user management.</p>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
