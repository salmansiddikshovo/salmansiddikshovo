- 👋 Hi, I’m @salmansiddikshovo
- 👀 I’m interested in ...
- 🌱 I’m currently learning ...
- 💞️ I’m looking to collaborate on ...
- 📫 How to reach me ...
- 😄 Pronouns: ...
- ⚡ Fun fact: ...
# Live Kitchen – MVP

Simple e-commerce style restaurant site. Static pages served by Express, data stored in SQLite (menu, contact submissions).

## Run locally

1. Install deps
   - `npm install`
2. Initialize database
   - `npm run init-db`
3. Start server
   - `npm start`

App runs at `http://localhost:3000`.

## Endpoints
- `GET /api/menu` – list menu items
- `POST /api/contact` – submit contact `{ name, email, phone?, message }`
- Static pages in `public/` (Home, About, Catering, Menu, Contact)

## Deploy
- Netlify or GitHub Pages for static only; for API you need a Node host (Railway, Render, Fly.io, Heroku). Build not required.

<!---
salmansiddikshovo/salmansiddikshovo is a ✨ special ✨ repository because its `README.md` (this file) appears on your GitHub profile.
You can click the Preview link to take a look at your changes.
--->
