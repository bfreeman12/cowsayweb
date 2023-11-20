import React, { useState } from "react";
import "../styles/contact.css";

const Request = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && email && message) {
      console.log(`Name: ${name}, Email: ${email}, Message: ${message}`);
      alert("This feature is currently under construction");
    }
  };

  return (
    <div className="contact">
      <h2>Request a fortune</h2>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>
          <label>
            Email:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <label>
            Request:
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />
          </label>
          <div className="submit-button-container">
            <input draggable="false" type="submit" value="Submit" />
          </div>
        </form>
      </div>
      <p style={{ fontSize: "0.8rem", fontStyle: "italic" }}>
        Fortunes requests are moderated and approved by a human
      </p>
    </div>
  );
};

export default Request;
