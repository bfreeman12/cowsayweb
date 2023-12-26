const express = require("express");
const cowsayjs = require("cowsayjs");
const cors = require("cors");
const sqlite3 = require("sqlite3").verbose();
const db = require("./database");
const axios = require("axios");
const app = express();
const nodemailer = require("nodemailer");

require("dotenv").config();

const ip_address = process.env.CLIENT_IP;
const client_port = process.env.CLIENT_PORT;
const SITE_SECRET = process.env.SITE_SECRET;
app.use(
  cors({
    origin: `http://${ip_address}:${client_port}`,
  })
);

app.use(express.json());

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

app.post("/verify", async (request, response) => {
  const { captchaValue } = request.body;
  const { data } = await axios.post(
    `https://www.google.com/recaptcha/api/siteverify?secret=${SITE_SECRET}&response=${captchaValue}`
  );
  response.send(data);
});

app.post("/contact", async (request, response) => {
  const { name, email, message } = request.body;

  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });

  let mailOptions = {
    from: email,
    to: process.env.EMAIL,
    subject: `Message from ${name}`,
    text: message,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
      return response.status(500).json({ error: "Internal server error" });
    }

    console.log("Email sent: " + info.response);
    response.sendStatus(200);
  });
});

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
