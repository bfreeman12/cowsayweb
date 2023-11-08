const express = require("express");
const app = express();
const cowsay = require("cowsay");
const fortune = "Your fortune is looking bright!";

app.get("/fortune", (req, res) => {
  const cow = cowsay.say({ text: fortune });
  res.send(`<pre>${cow}</pre>`);
});

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
