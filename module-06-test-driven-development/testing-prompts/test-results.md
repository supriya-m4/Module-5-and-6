# Test Execution Results

Module path: `C:\Users\2000141082\Module-5-and-6\module-06-test-driven-development`
Execution date: 2026-04-19
Port used/requested: `5100`
Source code changes: None. Backend and frontend code were not modified.

| Test Case ID | Test Case | Expected Result | Actual Result | Status |
| --- | --- | --- | --- | --- |
| 1.1 | `validateTaskPayload` accepts a valid title | The payload is accepted and no validation error is returned. | Command used: `npx jest tests/toggleCompletion.test.js --runInBand --forceExit`. Test failed before validation assertion because `tasks` is `undefined` and `beforeEach` calls `tasks.splice(...)`. `--forceExit` was used because importing `src/index.js` starts a server on port `5100`, leaving an open handle. | Failed |
| 1.2 | `validateTaskPayload` rejects a missing title | Validation rejects the payload before any task is created. | Command used: `npx jest tests/toggleCompletion.test.js --runInBand --forceExit`. Test failed before validation assertion because `tasks` is `undefined`. | Failed |
| 1.3 | `validateTaskPayload` rejects a whitespace-only title | Whitespace-only titles are treated as invalid. | Command used: `npx jest tests/toggleCompletion.test.js --runInBand --forceExit`. Test failed before validation assertion because `tasks` is `undefined`. Manual HTTP POST with whitespace title returned `400` and `{"error":"Task title is required."}`. | Automated failed; manual passed |
| 1.4 | `toggleCompletion` flips completion state | The completion flag flips each time the toggle logic runs. | Command used: `npx jest tests/toggleCompletion.test.js --runInBand --forceExit`. Test failed before toggle assertion because `tasks` is `undefined`. | Failed |
| 2.1 | `POST /tasks` creates a task and `GET /tasks` returns it | The API creates the task and returns it from the list endpoint. | Command used: `npx jest tests/tasks.integration.test.js --runInBand --forceExit`. Test failed because `app` is `undefined`, so `app.listen(...)` throws `TypeError`. Manual POST using Node fetch returned `201`; manual GET returned a JSON task list containing created tasks. | Automated failed; manual passed |
| 2.2 | POST then PATCH toggles a task | A created task can be toggled through the API. | Command used: `npx jest tests/tasks.integration.test.js --runInBand --forceExit`. Test failed because `app` is `undefined`; PATCH assertion did not run. | Failed |
| 3.1 | User creates and completes a task through the UI | The user can create and complete a task from the browser. | Command used: `npm run test:e2e`. Playwright completed successfully: 1 test passed. | Passed |
| 4.1 | Form requires a task title | Empty task titles cannot be submitted. | Command used: `npm run test:all` in frontend. Vitest completed successfully: 1 test file passed, 4 tests passed. | Passed |
| 4.2 | Valid submit clears inputs | Form fields reset after successful task creation. | Command used: `npm run test:all` in frontend. Vitest completed successfully: 1 test file passed, 4 tests passed. | Passed |
| 4.3 | Completion button updates rendered text | The UI reflects the updated completion state. | Command used: `npm run test:all` in frontend. Vitest completed successfully: 1 test file passed, 4 tests passed. | Passed |
| 5.1 | `GET /tasks` returns a JSON array | The endpoint returns a valid JSON task list. | Manual GET to `http://localhost:5100/tasks` returned a JSON array. Newman was not included in this execution. | Passed |
| 5.2 | `POST /tasks` requires title | The API rejects requests missing the required title. | Manual POST without a title returned `400` and a validation error. Newman was not included in this execution. | Passed |
| 5.3 | `PATCH /tasks/:id/complete` returns 404 for missing IDs | The API returns a clear not-found response. | Manual PATCH to `/tasks/not-found/complete` returned `404` and `{"error":"Task not found."}`. Newman was not included in this execution. | Passed |
| 6.1 | `POST /tasks` handles 50 virtual users | Request failures stay below 1% and p95 stays below `500ms`. | k6 was not included in this execution. | Not executed |
| 6.2 | `GET /tasks` remains responsive under repeated reads | 200 GET requests are successful and median response time is under `150ms`. | Manual 200 sequential GET requests completed with 200 successful, 0 failed, median `14.18ms`, max `214.79ms`. | Passed |
| 7.1 | `POST /tasks` rejects empty and unsafe titles | Unsafe payloads do not create tasks and do not crash the server. | Whitespace title returned `400`. Script-like title and notes returned `201` and were stored as text. Very long title returned `201`. | Partially failed |
| 7.2 | API does not execute or reflect script-like notes unsafely | Script-like content is escaped or rejected safely, and no script executes in the browser. | Backend accepted script-like title and notes as text with `201`. Browser e2e create/toggle flow passed, but script-like notes were not part of the Playwright scenario. | Not verified |
| 7.3 | CORS policy allows only expected frontend access | CORS is intentionally configured and does not expose the API more broadly than required. | Manual OPTIONS request with unexpected origin returned `Access-Control-Allow-Origin: *`. | Failed if restricted-origin policy is required |
| 8.1 | Create and toggle regression suite passes | Backend and frontend regression checks pass. | Backend Jest commands with `--forceExit` failed due undefined exports (`tasks` and `app`). Frontend `npm run test:all` passed: Vitest 4/4, Playwright 1/1, smoke passed. | Partially failed |
| 8.2 | CI runs regression checks after code changes | The pipeline fails if any core create or toggle behavior regresses. | No CI runner/config execution was performed locally. | Not executed locally |
| 9.1 | Backend health smoke check can list tasks | Backend is reachable and `/tasks` returns status `200` with JSON. | Manual GET to `http://localhost:5100/tasks` returned a JSON array. | Passed |
| 9.2 | Backend smoke check can create one task | Backend accepts basic task creation and returns the created title. | Manual Node fetch POST returned `201` with created task title `Node fetch smoke task`. Playwright also confirmed create flow through UI/backend. | Passed |
| 9.3 | Frontend dev server loads the home page | The frontend starts and renders the main ToDo screen. | Command used: `npm run test:all` in frontend. Smoke test passed with message `Smoke test passed: frontend dev server started and the page loaded.` Output also printed a Vite `Port 5179 is already in use` warning after success. | Passed with warning |
| 10.1 | User adds a task and sees it stored | The task is saved through the UI and available from backend-backed state after reload. | Playwright confirmed user can add a task and see it in the UI. Refresh persistence was not part of the script. | Partially passed |
| 10.2 | User toggles completion and sees persisted state | Completion changes are saved and remain correct after reload. | Playwright confirmed user can toggle completion in the UI. Refresh persistence was not part of the script. | Partially passed |
| 10.3 | Cucumber-style acceptance scenario | The app satisfies the core create and complete user journey. | Playwright passed the create-and-complete user journey. | Passed |

## Commands Used

```powershell
cd C:\Users\2000141082\Module-5-and-6\module-06-test-driven-development\todo-app\backend
npx jest tests/toggleCompletion.test.js --runInBand --forceExit
npx jest tests/tasks.integration.test.js --runInBand --forceExit
```

```powershell
cd C:\Users\2000141082\Module-5-and-6\module-06-test-driven-development\todo-app\frontend
npm run test:e2e
npm run test:all
```

## Notes

- `--forceExit` was used for backend Jest commands because importing `backend/src/index.js` starts a server on port `5100`, which leaves an open handle.
- The backend Jest tests completed quickly with `--forceExit` and revealed current setup/export failures: `tasks` and `app` are imported as `undefined` from `src/index.js`.
- Newman and k6 were not included in this execution.
