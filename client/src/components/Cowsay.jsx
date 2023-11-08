import "../styles/cowsay.css";
import { useState } from "react";
import { cowsay } from "cowsayjs";
import cows from "../assets/cows.txt";
function Cowsay() {
  const [selectedCow, setSelectedCow] = useState("");

  const textArea = document.getElementById("cowsay");
  textArea.onselect = (event) => {
    event.preventDefault();
  };

  const generateCowsay = () => {
    fetch(cows)
      .then((cow) => cow.text())
      .then((text) => {
        const textArea = document.getElementById("cowsay");
        const cowArray = text.split("\n");
        const randomNumber = Math.floor(Math.random() * cowArray.length);
        setSelectedCow(cowArray[randomNumber]);
        const cowText = cowsay(
          "joes sgdfggdfgdfgdfg dfd  asasdsasdasdsada binssgus",
          { cow: selectedCow }
        );
        textArea.value = cowText;
        textArea.style.height = "auto";
        textArea.style.height = `${textArea.scrollHeight}px`;

        const lines = cowText.split("\n");
        const maxLength = Math.max(...lines.map((line) => line.length));
        const charWidth = 10; // Approximate width of a character in pixels for a monospace font
        textArea.style.width = `${maxLength * charWidth}px`;
      });
  };

  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");

  svg.innerHTML = cowsay(
    "joes sgdfggdfgdfgdfg dfd  asasdsasdasdsada binssgus",
    { cow: selectedCow }
  );

  document.body.appendChild(svg);

  return (
    <div className="cowsay-content">
      <div className="cowsay-content-body">
        <textarea id="cowsay" readOnly="readonly"></textarea>
      </div>
      <button onClick={generateCowsay}>Generate</button>
    </div>
  );
}

export default Cowsay;
