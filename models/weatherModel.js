const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./weather.db");

// Create table for storing daily summaries
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS daily_summary (
      id INTEGER PRIMARY KEY,
      date TEXT,
      city TEXT,
      avg_temp REAL,
      max_temp REAL,
      min_temp REAL,
      dominant_condition TEXT
    )
  `);
});

module.exports = db;
