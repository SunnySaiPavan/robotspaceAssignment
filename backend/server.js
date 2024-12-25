// server.js
const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const cors = require('cors');

// Initialize app and middleware
const app = express();
app.use(cors());
app.use(bodyParser.json());

// Database connection
const db = new sqlite3.Database('./db/database.sqlite', (err) => {
  if (err) console.error(err.message);
  else {
    console.log('Connected to the SQLite database.');

    // Create tasks table if not exists
    db.run(`
      CREATE TABLE IF NOT EXISTS tasks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        description TEXT NOT NULL,
        dueDate TEXT NOT NULL,
        status TEXT DEFAULT 'Pending',
        priority TEXT DEFAULT 'Low'
      )
    `, (err) => {
      if (err) console.error('Error creating table:', err.message);
    });
  }
});

// API Endpoints

// Get all tasks
app.get('/api/tasks', (req, res) => {
  const query = 'SELECT * FROM tasks';
  db.all(query, [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Add a new task
app.post('/api/tasks', (req, res) => {
  const { name, description, dueDate, status = 'Pending', priority = 'Low' } = req.body;
  const query = `
    INSERT INTO tasks (name, description, dueDate, status, priority)
    VALUES (?, ?, ?, ?, ?)
  `;
  db.run(query, [name, description, dueDate, status, priority], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ id: this.lastID });
  });
});

// Update a task
app.patch('/api/tasks/:id', (req, res) => {
  const { id } = req.params;
  const { name, description, dueDate, status, priority } = req.body;
  const query = `
    UPDATE tasks
    SET name = ?, description = ?, dueDate = ?, status = ?, priority = ?
    WHERE id = ?
  `;
  db.run(query, [name, description, dueDate, status, priority, id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ changes: this.changes });
  });
});

// Delete a task
app.delete('/api/tasks/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM tasks WHERE id = ?';
  db.run(query, id, function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ changes: this.changes });
  });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
