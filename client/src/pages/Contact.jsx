import React, { useState } from "react";
import "../styles/Contact.css";

const ContactUs = () => {
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
      <h2>Contact Us</h2>
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
            Message:
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
    </div>
  );
};

export default ContactUs;
