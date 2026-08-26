# Agent Integration Instructions

This document outlines the architecture and integration steps required to connect your Python-based Gemini AI Agent to this frontend and its database. 

## 1. Architecture Overview

Currently, the frontend uses an `ApiClient` abstraction (`src/services/apiClient.ts`) to fetch data. It is presently configured to return mock data immediately.

To let the AI Agent design and serve the syllabus dynamically:
1. **Frontend**: We will point `ApiClient.ts` to your Python backend API URL.
2. **Backend (Python)**: You will build an API (e.g., using FastAPI or Flask) that receives requests for subjects and courses.
3. **Database (e.g., PostgreSQL / Firestore)**: The Python backend will interact with the database.
4. **AI Agent (Gemini ADK)**: When a course is missing or requested to be generated, the Python backend will invoke the Gemini ADK, which will generate the structured syllabus, save it to the database, and return it to the frontend.

## 2. Steps to Connect the Frontend

### A. Update the API Base URL
In `src/services/apiClient.ts`, change the `BASE_URL` to point to your Python backend (e.g., `http://localhost:8000/api/v1`).

```typescript
// Replace this:
const BASE_URL = import.meta.env.VITE_API_URL || '';

// With your python backend url:
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1';
```

### B. Disable Mock Fallbacks
In `src/services/apiClient.ts`, locate the `SIMULATE_LATENCY` and `mockFactory` logic. Currently, if an API call fails or if no backend is present, it uses the mock data. Remove the `mockFactory` execution so it strictly makes `fetch()` calls to your Python server.

## 3. Building the Python Backend

Your Python server must implement the following REST endpoints to replace the frontend's mock data requirements:

### Core Syllabus Endpoints
- `GET /subjects` -> Returns a list of subjects (e.g. Financial Literacy).
- `GET /subjects/{slug}` -> Returns details of a specific subject.
- `GET /courses?subjectId={id}` -> Returns courses under a subject.
- `GET /courses/{id}/lessons/{lessonId}` -> Returns the full lesson payload.

### The AI Generation Trigger
When a user requests a new topic or the database is empty, your backend should:
1. Detect the missing course/lesson.
2. Invoke the **Gemini ADK**.
3. Pass a structured prompt: *"Generate a structured JSON syllabus for a course on {Topic}. Include modules, lessons, and interactive quiz questions."*
4. Parse the Gemini JSON output.
5. Save the generated course structure to your database.
6. Return the newly created course to the frontend payload.

## 4. Required Database Schema (Relational Example)

If you are using PostgreSQL, you should define at minimum:

- `subjects` (id, title, category, description, slug)
- `courses` (id, subject_id, title, description, difficulty, total_xp)
- `modules` (id, course_id, title, order)
- `lessons` (id, module_id, title, content_markdown, is_interactive)

The AI Agent will populate these tables automatically based on user curriculum requests.
