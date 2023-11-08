const express = require("express");
const cowsayjs = require("cowsayjs");
const cors = require("cors");
const fs = require("fs");
const app = express();
const fortunes = require("./fortune.json");
const cows = require("./cows.json");
require("dotenv").config();

const ip_address = process.env.CLIENT_IP;
const client_port = process.env.CLIENT_PORT;

app.use(
  cors({
    origin: `http://${ip_address}:${client_port}`,
  })
);

app.get("/fortune", async (req, res) => {
  const jsonFortune = JSON.parse(JSON.stringify(fortunes));
  const jsonCows = JSON.parse(JSON.stringify(cows));

  let chosencow, fortuneMsg;
  try {
    chosencow =
      jsonCows["cows"][Math.floor(Math.random() * jsonCows["cows"].length)];

    fortuneMsg =
      jsonFortune["fortunes"][
        Math.floor(Math.random() * jsonFortune["fortunes"].length)
      ];
  } catch (err) {
    console.error(err);
    return;
  }
  const msg = cowsayjs.moo(fortuneMsg, {
    cow: chosencow,
  });
  res.json({ message: msg });
});
app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
