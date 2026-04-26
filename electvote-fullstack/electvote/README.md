# ElectVote BootCamp 2.0 — Full Stack

React frontend + Spring Boot backend.

## Quick Start

### Backend
```bash
cd electvote-api
# Edit src/main/resources/application.yml with your DB credentials
mvn spring-boot:run
# Runs at http://localhost:8080
```

### Frontend
```bash
cd electvote
npm install && npm start
# Runs at http://localhost:3000
```

## API Endpoints

| Method | Endpoint                       | Auth   | Description               |
|--------|-------------------------------|--------|---------------------------|
| POST   | /api/auth/register            | Public | Register voter            |
| POST   | /api/auth/login               | Public | Login → JWT               |
| GET    | /api/elections                | Public | List all elections        |
| GET    | /api/elections?status=OPEN    | Public | Filter by status          |
| GET    | /api/elections/:id/results    | Public | Live results              |
| POST   | /api/vote                     | JWT    | Cast a vote               |
| GET    | /api/vote/check?electionId=x  | JWT    | Has voter already voted?  |
| POST   | /api/admin/elections          | ADMIN  | Create election           |
| POST   | /api/admin/candidates         | ADMIN  | Add candidate             |

## Auth Flow
1. Login → JWT stored in localStorage
2. Axios attaches `Authorization: Bearer <token>` automatically
3. 401 response → auto logout + redirect

## Database (PostgreSQL)
```sql
CREATE DATABASE electvote;
```
Tables auto-created by Hibernate on first run.

## Frontend API Layer
```
src/api/
  client.js      ← Axios + JWT interceptor
  auth.js        ← login, register, logout
  elections.js   ← getAllElections, getResults
  vote.js        ← castVote, hasVoted
  admin.js       ← createElection, addCandidate

src/hooks/
  useAuth.js      ← auth state + localStorage sync
  useElections.js ← fetch with loading/error
  useResults.js   ← live polling every 30s
```
