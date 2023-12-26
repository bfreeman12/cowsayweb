import React, { useState, useRef } from "react";
import axios from "axios";
import ReCAPTCHA from "react-google-recaptcha";
import "../styles/contact.css";

const Request = () => {
  const recaptcha = useRef();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    const captchaValue = recaptcha.current.getValue();
    if (!captchaValue) {
      setStatusMessage("Please verify you are human");
      setTimeout(() => setStatusMessage(""), 3000);
      return;
    }

    axios
      .post("/verify", { captchaValue })
      .then((response) => {
        const { success } = response.data;

        if (!success) {
          setStatusMessage("Captcha verification failed");
          setTimeout(() => setStatusMessage(""), 3000);
          return;
        }

        // If captcha verification is successful, submit the form
        if (name && email && message) {
          axios
            .post("/contact", {
              name,
              email,
              message,
            })
            .then((response) => {
              if (response.status === 200) {
                setStatusMessage("Message sent successfully");
              } else {
                setStatusMessage(
                  "An error occurred while sending your message"
                );
              }
              setTimeout(() => setStatusMessage(""), 3000);
            })
            .catch((error) => {
              console.error(
                "An error occurred while sending your message:",
                error
              );
              setStatusMessage("An error occurred while sending your message");
              setTimeout(() => setStatusMessage(""), 3000);
            });
        }
      })
      .catch((error) => {
        console.error("An error occurred while verifying the captcha:", error);
        setStatusMessage("An error occurred while verifying the captcha");
        setTimeout(() => setStatusMessage(""), 3000);
      });
  };

  return (
    <div className="contact">
      <h2>Request a fortune</h2>
      <div className="form-container">
        <form onSubmit={(e) => handleSubmit(e)}>
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
            <input draggable="false" type="submit" />
          </div>
          <ReCAPTCHA ref={recaptcha} sitekey={import.meta.env.VITE_SITE_KEY} />
        </form>
      </div>
      <p style={{ fontSize: "0.8rem", fontStyle: "italic" }}>
        Fortunes requests are moderated and approved by a human
      </p>
      {statusMessage && <p>{statusMessage}</p>}
    </div>
  );
};

export default Request;
