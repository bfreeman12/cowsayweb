const sqlite3 = require("sqlite3").verbose();

// Connect to the SQLite database
let db = new sqlite3.Database("./fortune.db", (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log("Connected to the fortune database.");
});

module.exports = db;
