# Next.js Learning Playground

A hands-on learning repository with two small projects side by side. The root is a **Next.js (App Router) + TypeScript** app used to practise routing, server components, client components, CSS Modules and server-side data fetching. The `backend/` and `frontend/` folders hold a separate **full-stack contact manager**: a Flask + SQLite REST API and a React (Vite) client that performs full CRUD against it.

## Features

**Next.js app (root)**
- File-based routing with the App Router: `/`, `/users` and `/users/new`
- Async server component on `/users` that fetches users from the JSONPlaceholder API with `cache: "no-store"` (rendered fresh on every request) and shows them in a name / email table
- Client component (`"use client"`) with an event handler (`AddToCart`) nested inside a server component (`ProductCard`)
- Component-scoped styling with CSS Modules, plus Tailwind CSS v4 and the Geist font via `next/font`

**Contact manager (`backend/` + `frontend/`)**
- REST API to list, create, update and delete contacts
- Input validation (first name, last name and email required; email unique)
- React UI with a contacts table, a modal form reused for create and edit, and delete actions

## Tech Stack

| Part | Technologies |
| --- | --- |
| Next.js app | Next.js 16, React 19, TypeScript, Tailwind CSS 4, CSS Modules, ESLint |
| Backend | Python, Flask 3, Flask-SQLAlchemy, Flask-CORS, SQLite |
| Frontend | React 19, Vite, ESLint |

## Project Structure

```
.
├── app/                        # Next.js App Router
│   ├── layout.tsx              # Root layout (Geist fonts, global styles, page metadata)
│   ├── page.tsx                # Home page: link to /users + ProductCard
│   ├── users/page.tsx          # Server component rendering JSONPlaceholder users as a table
│   ├── users/new/page.tsx      # Placeholder "new user" route
│   └── components/
│       ├── AddToCart.tsx       # Client component with an onClick handler
│       └── ProductCard/        # Server component styled with a CSS Module
├── public/                     # Static assets
├── backend/                    # Flask REST API
│   ├── config.py               # Flask app, CORS and SQLAlchemy (SQLite) setup
│   ├── models.py               # Contact model
│   ├── main.py                 # CRUD routes and app entry point
│   └── requirements.txt
└── frontend/                   # React + Vite client for the API
    └── src/
        ├── App.jsx             # Fetches contacts, manages the modal
        ├── ContactList.jsx     # Contacts table with Update/Delete
        └── ContactForm.jsx     # Create/edit form
```

## Getting Started

### Prerequisites

- Node.js 20.9 or later and npm
- Python 3 and `pip`

No environment variables are required.

### Next.js app

```bash
npm install
npm run dev        # http://localhost:3000
```

Other scripts: `npm run build`, `npm run start`, `npm run lint`.

### Backend (Flask API)

```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate   # Windows: .venv\Scripts\activate
pip install -r requirements.txt
python main.py             # http://127.0.0.1:5000
```

`flask --app main run` works too. On start-up the app creates the SQLite database (`backend/instance/mydatabase.db`) and its tables if they do not exist. The database file is gitignored, so every clone starts with an empty contact list.

### Frontend (React + Vite)

Start the backend first, then in a second terminal:

```bash
cd frontend
npm install
npm run dev        # Vite prints the local URL (default http://localhost:5173)
```

The client calls the API at `http://127.0.0.1:5000`.

## Usage

### API endpoints

| Method | Endpoint | Body | Description |
| --- | --- | --- | --- |
| GET | `/contacts` | – | List all contacts |
| POST | `/create_contact` | `{ "firstName", "lastName", "email" }` | Create a contact (all fields required) |
| PATCH | `/update_contact/<id>` | any of `firstName`, `lastName`, `email` | Update a contact |
| DELETE | `/delete_contact/<id>` | – | Delete a contact |

Example:

```bash
curl -X POST http://127.0.0.1:5000/create_contact \
  -H "Content-Type: application/json" \
  -d '{"firstName":"Jane","lastName":"Doe","email":"jane@example.com"}'
```
