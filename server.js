const path = require('path');
const express = require('express');
const morgan = require('morgan');
const Database = require('better-sqlite3');

const app = express();
const PORT = process.env.PORT || 3000;
const DB_PATH = path.join(__dirname, 'data', 'live-kitchen.db');

// Middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// Database connection (read-only here; schema created by scripts/init-db.js)
let db;
try {
  db = new Database(DB_PATH);
} catch (err) {
  console.error('Failed to open database', err);
}

// Simple API routes for menu and contact submissions
app.get('/api/menu', (req, res) => {
  try {
    const rows = db.prepare('SELECT id, name, description, price_cents, image_url, is_featured FROM menu_items ORDER BY is_featured DESC, name').all();
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch menu' });
  }
});

app.post('/api/contact', (req, res) => {
  const { name, email, phone, message } = req.body || {};
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'name, email, and message are required' });
  }
  try {
    const stmt = db.prepare('INSERT INTO contacts (name, email, phone, message) VALUES (?, ?, ?, ?)');
    const info = stmt.run(name, email, phone || null, message);
    res.status(201).json({ id: info.lastInsertRowid });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to submit contact' });
  }
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`Live Kitchen server running at http://localhost:${PORT}`);
});

