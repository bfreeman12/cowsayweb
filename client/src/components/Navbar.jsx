import "../styles/navbar.css";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Navbar() {
  const handleClick = (e) => {
    alert("This feature is not yet implemented");
  };

  return (
    <div className="navbar">
      <h1>Cowsay Web</h1>
      <button>
        <FontAwesomeIcon
          icon={faGear}
          onClick={(e) => handleClick(e)}
          className="icon"
        />
      </button>
    </div>
  );
}

export default Navbar;
