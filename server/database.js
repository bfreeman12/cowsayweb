const sqlite3 = require("sqlite3").verbose();
const path = require("path");
const DBSOURCE = path.resolve(__dirname, "fortune.db");

const db = new sqlite3.Database(DBSOURCE, (err) => {
  if (err) {
    console.log(err.message);
    throw err;
  } else {
    console.log("Connected to database");
  }
});
module.exports = db;
