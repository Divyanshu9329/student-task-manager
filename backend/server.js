const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");

const app = express();
const PORT = 5000;

// Enable CORS and parse JSON bodies
app.use(cors());
app.use(express.json());

// Connect to the SQLite database (or create it if not exists)
const database = new sqlite3.Database("./tasks.db");

// Create the tasks table if it doesn't exist already
const createTableQuery = `
  CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`;
database.run(createTableQuery);

// Get all tasks, ordered by newest first
app.get("/tasks", (req, res) => {
  const query = "SELECT * FROM tasks ORDER BY id DESC";
  database.all(query, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

// Add a new task and return the created task including timestamp
app.post("/tasks", (req, res) => {
  const { title } = req.body;

  const insertQuery = "INSERT INTO tasks (title) VALUES (?)";
  database.run(insertQuery, [title], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    // Fetch the newly created task using the last inserted ID
    const selectQuery = "SELECT * FROM tasks WHERE id = ?";
    database.get(selectQuery, [this.lastID], (err, row) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json(row);
    });
  });
});

// Delete a task by its ID
app.delete("/tasks/:id", (req, res) => {
  const taskId = req.params.id;

  const deleteQuery = "DELETE FROM tasks WHERE id = ?";
  database.run(deleteQuery, [taskId], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ success: true });
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
