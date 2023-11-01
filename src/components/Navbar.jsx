import "../styles/navbar.css";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Navbar() {
  return (
    <div className="navbar">
      <h1>Cowsay Web</h1>
      <button>
        <FontAwesomeIcon icon={faGear} className="icon" />
      </button>
    </div>
  );
}

export default Navbar;
