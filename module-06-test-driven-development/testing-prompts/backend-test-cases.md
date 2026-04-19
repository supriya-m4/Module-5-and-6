# Backend Test Cases

This file summarizes the runnable backend coverage. The full testcase catalogue is in `testing-prompts/test-cases.md`.

## Unit testing

Target file: `todo-app/backend/tests/toggleCompletion.test.js`

Coverage:
- `validateTaskPayload` accepts a valid title.
- `validateTaskPayload` rejects missing, empty, and whitespace-only titles.
- Completion logic flips `completed` from `false` to `true` and back to `false`.

Run:

```powershell
cd c:\Users\2000141082\Module-5-and-6\module-06-test-driven-development\todo-app\backend
npm run test:unit
```

## Integration and API testing

Target file: `todo-app/backend/tests/tasks.integration.test.js`

Coverage:
- `GET /tasks` returns a JSON array.
- `POST /tasks` creates a task with `completed: false`.
- `GET /tasks` returns the created task.
- `PATCH /tasks/:id/complete` toggles completion.
- `POST /tasks` rejects missing title with `400`.
- `PATCH /tasks/:id/complete` returns `404` for an unknown ID.
- Script-like notes are stored as text and do not crash the API.

Run:

```powershell
cd c:\Users\2000141082\Module-5-and-6\module-06-test-driven-development\todo-app\backend
npm run test:integration
```

## Optional API and performance tools

Postman/Newman files:
- `todo-app/backend/tests/postman/todo-api.postman_collection.json`
- `todo-app/backend/tests/postman/todo-api.postman_environment.json`

k6 file:
- `todo-app/backend/tests/performance/tasks-post-load.k6.js`

Backend runner:
- `todo-app/backend/tests/run-backend-tests.ps1`
