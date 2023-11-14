import "../styles/navbar.css";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Settings from "./Settings";
import { useState } from "react";

function Navbar() {
  const [settingsOpen, setSettingsOpen] = useState(false);

  const handleClick = (e) => {
    e.preventDefault();
    setSettingsOpen(!settingsOpen);
  };

  return (
    <div className="navbar">
      <h1>Cowsay Web</h1>
      {/* TODO: implement fortune upload request */}

      <button>
        <FontAwesomeIcon
          icon={faGear}
          onClick={(e) => handleClick(e)}
          className="icon"
        />
      </button>
      {settingsOpen && <Settings />}
    </div>
  );
}

export default Navbar;
