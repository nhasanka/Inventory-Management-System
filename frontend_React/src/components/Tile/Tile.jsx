import { Link } from "react-router-dom";
import "./Tile.css";
function Tile({ title, description, link }) {
  return (
    <Link to={link} className="tile">
      <h3>{title}</h3>
      <p>{description}</p>
    </Link>
  );
}

export default Tile;
