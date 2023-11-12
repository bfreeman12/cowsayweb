const express = require("express");
const cowsayjs = require("cowsayjs");
const cors = require("cors");
const sqlite3 = require("sqlite3").verbose();
const db = require("./database");
const app = express();
require("dotenv").config();

const ip_address = process.env.CLIENT_IP;
const client_port = process.env.CLIENT_PORT;

app.use(
  cors({
    origin: `http://${ip_address}:${client_port}`,
  })
);

app.get("/fortune", async (req, res) => {
  try {
    const [cowRow, fortuneRow] = await Promise.all([
      new Promise((resolve, reject) => {
        db.all("SELECT * FROM cows ORDER BY RANDOM() LIMIT 1", (err, rows) => {
          if (err) {
            reject(err);
          } else {
            resolve(rows[0]);
          }
        });
      }),
      new Promise((resolve, reject) => {
        db.all(
          "SELECT * FROM fortunes ORDER BY RANDOM() LIMIT 1",
          (err, rows) => {
            if (err) {
              reject(err);
            } else {
              resolve(rows[0]);
            }
          }
        );
      }),
    ]);
    const msg = cowsayjs.moo(fortuneRow.fortune, {
      cow: cowRow.cow,
    });
    res.json({ message: msg });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
