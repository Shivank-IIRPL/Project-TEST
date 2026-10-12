# Project-TEST: Order List

A simple order list app.

- `backend/`: Node.js + Express API (in-memory data)
- `frontend/`: React (Vite) UI

## Run

Backend (port 5000):

```bash
cd backend
npm install
npm start
```

Frontend (port 3000):

```bash
cd frontend
npm install
npm run dev
```

Open http://localhost:3000. The frontend proxies `/api` to the backend.
