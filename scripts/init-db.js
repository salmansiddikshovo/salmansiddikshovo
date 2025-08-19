const fs = require('fs');
const path = require('path');
const Database = require('better-sqlite3');

const DATA_DIR = path.join(__dirname, '..', 'data');
const DB_PATH = path.join(DATA_DIR, 'live-kitchen.db');

fs.mkdirSync(DATA_DIR, { recursive: true });

const db = new Database(DB_PATH);

db.exec(`
CREATE TABLE IF NOT EXISTS menu_items (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  price_cents INTEGER NOT NULL CHECK(price_cents >= 0),
  image_url TEXT,
  is_featured INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS contacts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  message TEXT NOT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
`);

// Seed data
const count = db.prepare('SELECT COUNT(*) as c FROM menu_items').get().c;
if (count === 0) {
  const insert = db.prepare('INSERT INTO menu_items (name, description, price_cents, image_url, is_featured) VALUES (?, ?, ?, ?, ?)');
  const items = [
    ['Signature Butter Chicken', 'Creamy tomato gravy, slow-cooked chicken, fenugreek.', 1699, '/images/butter-chicken.jpg', 1],
    ['Paneer Tikka', 'Char-grilled cottage cheese, peppers, onions, spices.', 1299, '/images/paneer-tikka.jpg', 1],
    ['Garlic Naan', 'Leavened bread with garlic and coriander.', 399, '/images/garlic-naan.jpg', 0],
    ['Mango Lassi', 'Refreshing mango yogurt drink.', 499, '/images/mango-lassi.jpg', 0]
  ];
  const tx = db.transaction(() => {
    for (const item of items) insert.run(...item);
  });
  tx();
  console.log('Seeded menu_items');
}

console.log('Database initialized at', DB_PATH);

