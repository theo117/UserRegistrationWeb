# User Registration Web

A small full-stack user directory with a Spring Boot API and a React frontend.

## Project Structure

- `fullstack-backend` - Spring Boot REST API backed by JPA/H2 by default.
- `fullstack-frontend` - React app for listing, creating, viewing, editing, and deleting users.

## Backend

From `fullstack-backend`:

```bash
./mvnw spring-boot:run
```

On Windows PowerShell:

```powershell
.\mvnw.cmd spring-boot:run
```

The API runs on `http://localhost:8080` unless `PORT` is set.

## Frontend

From `fullstack-frontend`:

```bash
npm install
npm start
```

The frontend uses `REACT_APP_API_URL` when provided and falls back to `http://localhost:8080` for local development.

## Useful Checks

From `fullstack-frontend`:

```bash
npm test -- --watchAll=false
npm run build
```

From `fullstack-backend`:

```bash
./mvnw test
```
