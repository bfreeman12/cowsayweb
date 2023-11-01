import "../styles/cowsay.css";
import { useState } from "react";
import { cowsay } from "cowsayjs";
import cows from "../assets/cows.txt";
function Cowsay() {
  const [selectedCow, setSelectedCow] = useState("");

  const generateCowsay = () => {
    fetch(cows)
      .then((cow) => cow.text())
      .then((text) => {
        const textArea = document.getElementById("cowsay");
        const cowArray = text.split("\n");
        const randomNumber = Math.floor(Math.random() * cowArray.length);
        setSelectedCow(cowArray[randomNumber]);
        textArea.value = cowsay(
          "joes sgdfggdfgdfgdfg dfd  asasdsasdasdsada binssgus",
          { cow: selectedCow }
        );
        textArea.style.height = "auto";
        textArea.style.width = "auto";
        textArea.style.width = `${textArea.scrollHeight / 1.2}px`;
        textArea.style.height = `${textArea.scrollHeight}px`;
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
