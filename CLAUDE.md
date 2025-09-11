# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Frontend (React/Vite)
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm test` - Run tests once
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Run tests with coverage
- `npm run test:ui` - Run tests with UI interface

### Backend (Express/SQLite)
- `cd server && npm run dev` - Start backend with nodemon
- `cd server && npm run start` - Start backend in production
- `cd server && npm test` - Run backend tests
- `cd server && npm run test:coverage` - Run backend tests with coverage

### Docker Development
- `docker-compose up` - Run full stack (backend on :3001, frontend on :5173)
- `npm run test:docker` - Run all tests in containers
- `npm run test:backend` - Run only backend tests in container
- `npm run test:frontend` - Run only frontend tests in container
- `npm run test:docker:unit` - Run unit tests for both services
- `npm run test:docker:e2e` - Run end-to-end tests
- `npm run test:docker:clean` - Clean up test containers

## Architecture

This is a full-stack movie search application with the following structure:

### Backend (Express.js)
- **Entry point**: `server/server.js` - Express server with CORS, error handling
- **Database**: SQLite with `server/db.js` - handles search metrics and movie caching
- **Routes**:
  - `server/routes/movies.js` - TMDB API proxy (search, discover)
  - `server/routes/metrics.js` - Search analytics and trending data
- **External API**: TMDB (The Movie Database) via Bearer token auth
- **Environment**: Requires `TMDB_API_KEY` environment variable

### Frontend (React/Vite)
- **Main component**: `src/App.jsx` - handles search state, debouncing, API calls
- **Components**:
  - `src/components/Search.jsx` - Search input component
  - `src/components/MovieCard.jsx` - Individual movie display
  - `src/components/Spinner.jsx` - Loading indicator
- **API Service**: `src/services/api.js` - abstracts backend calls
- **Styling**: Tailwind CSS with custom components

### Data Flow
1. User searches → debounced input → API call to backend
2. Backend proxies TMDB API → caches results in SQLite
3. Search metrics stored for trending analysis
4. Frontend displays results with error handling

### Testing Stack
- **Frontend**: Vitest + React Testing Library + jsdom
- **Backend**: Jest + Supertest
- **E2E**: Playwright (in `e2e/` directory)
- **Docker**: Separate test containers for isolation

### Key Environment Variables
- `TMDB_API_KEY` - Required for TMDB API access
- `FRONTEND_URL` - CORS configuration (default: http://localhost:5173)
- `VITE_API_BASE_URL` - Frontend API endpoint (default: http://localhost:3001/api)

## Database Schema

SQLite database (`server/movie_app.db`) with two main tables:
- `search_metrics` - tracks search terms, counts, associated movie data
- `movies` - caches TMDB movie data to reduce API calls

## Development Notes

The application uses debounced search (500ms) to minimize API calls. Search results automatically update trending movies based on search frequency. The backend caches the first 5 search results and top 10 popular movies to improve performance.