import React from "react";
import "../styles/settings.css";
import { Link } from "react-router-dom";

const Settings = () => {
  return (
    <div className="settings">
      <div className="settings-container">
        <Link to="/request-fortune" className="link">
          Request Fortune
        </Link>
      </div>
    </div>
  );
};

export default Settings;
