# Copilot Instructions for AI-Powered Travel Assistant

## Project Overview
This is a full-stack MERN (MongoDB, Express, React, Node.js) application for an AI-powered travel assistant. It consists of two main components:
- **backend/**: Node.js/Express REST API with MongoDB for user authentication and travel list management.
- **frontend/**: React SPA for user interaction, authentication, and travel list UI.

## Key Architectural Patterns
- **Service Boundaries**: Frontend communicates with backend via REST endpoints (`/auth`, `/api/lists`).
- **Authentication**: JWT-based, with tokens stored in `localStorage` on the frontend. Protected routes use middleware (`backend/middleware/auth.js`).
- **Data Models**: See `backend/models/User.js` and `backend/models/TravelList.js` for schema definitions.
- **State Management**: React hooks (`useState`, `useEffect`) are used for local state. No global state library.
- **Routing**: React Router v6 (`BrowserRouter`, `Routes`, `Route`) for SPA navigation.

## Developer Workflows
- **Backend**
  - Start: `nodemon server.js` (recommended for auto-reload)
  - Environment: `.env` file required for `MONGO_URI`, `JWT_SECRET`, `PORT`
  - Dependencies: Install via `npm install` in `backend/`
- **Frontend**
  - Start: `npm start` in `frontend/` (runs on port 3000)
  - Build: `npm run build` (outputs to `frontend/build/`)
  - Test: `npm test` (Jest/React Testing Library)
  - Dependencies: Install via `npm install` in `frontend/`

## Project-Specific Conventions
- **API URLs**: Frontend hardcodes backend URLs as `http://localhost:5000/...` (update for production).
- **Travel List Ownership**: Currently, backend uses a mock `USER_ID` (see `routes/lists.js`). Update to use authenticated user for production.
- **Error Handling**: API errors return `{ message: "..." }` JSON. Frontend displays alerts for failures.
- **Styling**: CSS modules per page/component in `frontend/src/styles/`.
- **Navigation**: Navbar links are dynamic based on login state (see `components/Navbar.js`).

## Integration Points
- **MongoDB**: Connection string in `.env` (`MONGO_URI`).
- **JWT**: Secret in `.env` (`JWT_SECRET`).
- **Frontend/Backend Communication**: Axios for HTTP requests.

## Examples
- **Protecting Routes**: Use `auth.js` middleware in backend and token checks in frontend (`Home.js`, `App.js`).
- **CRUD Operations**: See `routes/lists.js` and `pages/MyLists.js` for end-to-end example.

## Recommendations for AI Agents
- Always check for `.env` variables when modifying backend config.
- When adding new models or routes, update both backend and frontend for data flow.
- Use React hooks for state and effects; avoid class components.
- Keep REST endpoints consistent and document any changes in this file.

## Key Files
- `backend/server.js`: Express app entry point
- `backend/routes/auth.js`, `backend/routes/lists.js`: API endpoints
- `backend/models/User.js`, `backend/models/TravelList.js`: Mongoose schemas
- `frontend/src/App.js`, `frontend/src/pages/`: Main React app and pages
- `frontend/src/components/Navbar.js`: Navigation logic
- `frontend/src/styles/`: CSS for UI

---
_If any section is unclear or missing, please provide feedback to improve these instructions._
