import "../styles/cowsay.css";
import getFortune from "../functions/apifetch";
import React, { useState, useEffect } from "react";

function Cowsay() {
  const [fortune, setFortune] = useState("");

  useEffect(() => {
    const generateFortune = async () => {
      const text = await getFortune();
      setFortune(text);
    };

    generateFortune();
  }, []);

  useEffect(() => {
    const textArea = document.getElementById("textArea");
    if (textArea) {
      const lines = fortune.split("\n");
      const maxWidth = Math.max(...lines.map((line) => line.length));
      const width = maxWidth * 8;
      const height = lines.length * 16;

      textArea.style.width = `${width}px`;
      textArea.style.height = `${height}px`;
    }
  }, [fortune]);

  const handleClick = async (event) => {
    event.preventDefault();
    const text = await getFortune();
    setFortune(text);
  };

  return (
    <div className="cowsay-content">
      <button onClick={(e) => handleClick(e)}>click me for message!</button>

      <div className="cowsay-content-body">
        {fortune ? (
          <textarea id="textArea" value={fortune} readOnly />
        ) : (
          <h5 style={{ color: "lightgrey" }}>Please generate a fortune</h5>
        )}
      </div>
    </div>
  );
}

export default Cowsay;
