# Test Cases

These test cases map directly to the testing scenarios listed in `README.md` for the React + Node ToDo app.

## 1. Unit Testing

### Test Case 1.1: validateTaskPayload accepts a valid title

- Scenario from README: isolate backend validation without touching the network.
- Target: `todo-app/backend/src/index.js`
- Preconditions: backend dependencies are installed.
- Test steps:
  1. Call `validateTaskPayload` with a payload that contains a non-empty `title`.
  2. Include optional fields such as `notes` or `due` if supported by the app.
  3. Assert that validation succeeds.
- Expected result: the payload is accepted and no validation error is returned.

### Test Case 1.2: validateTaskPayload rejects a missing title

- Scenario from README: cover missing title validation.
- Target: `todo-app/backend/src/index.js`
- Preconditions: backend dependencies are installed.
- Test steps:
  1. Call `validateTaskPayload` with an empty object.
  2. Assert that validation fails.
  3. Assert that the error explains that `title` is required.
- Expected result: validation rejects the payload before any task is created.

### Test Case 1.3: validateTaskPayload rejects a whitespace-only title

- Scenario from README: cover whitespace-only title validation.
- Target: `todo-app/backend/src/index.js`
- Preconditions: backend dependencies are installed.
- Test steps:
  1. Call `validateTaskPayload` with `title` set to spaces only.
  2. Assert that validation fails.
  3. Assert that no task object is returned.
- Expected result: whitespace-only titles are treated as invalid.

### Test Case 1.4: toggleCompletion flips completion state

- Scenario from README: isolate task state toggling.
- Target file: `todo-app/backend/tests/toggleCompletion.test.js`
- Preconditions: backend dependencies are installed.
- Test steps:
  1. Create an in-memory task with `completed: false`.
  2. Run the toggle completion logic for that task.
  3. Assert that `completed` changes to `true`.
  4. Run the toggle logic again.
  5. Assert that `completed` changes back to `false`.
- Expected result: the completion flag flips each time the toggle logic runs.
- Run:

```powershell
cd c:\Users\2000141082\Module-5-and-6\module-06-test-driven-development\todo-app\backend
npm run test:unit
```

## 2. Integration Testing

### Test Case 2.1: POST /tasks creates a task and GET /tasks returns it

- Scenario from README: server and in-memory persistence work together.
- Target file: `todo-app/backend/tests/tasks.integration.test.js`
- Preconditions: backend test environment is available.
- Test steps:
  1. Send `POST /tasks` with a valid title.
  2. Assert that the response status is `201`.
  3. Assert that the response body contains `id`, `title`, and `completed: false`.
  4. Send `GET /tasks`.
  5. Assert that the created task appears in the returned array.
- Expected result: the API creates the task and returns it from the list endpoint.
- Run:

```powershell
cd c:\Users\2000141082\Module-5-and-6\module-06-test-driven-development\todo-app\backend
npm run test:integration
```

### Test Case 2.2: POST then PATCH toggles a task

- Scenario from README: exercise POST and PATCH endpoints in sequence.
- Target file: `todo-app/backend/tests/tasks.integration.test.js`
- Preconditions: backend test environment is available.
- Test steps:
  1. Send `POST /tasks` with a valid title.
  2. Save the returned task `id`.
  3. Send `PATCH /tasks/:id/complete`.
  4. Assert that the response status is `200`.
  5. Assert that `completed` changes from `false` to `true`.
- Expected result: a created task can be toggled through the API.

## 3. End-to-End Testing

### Test Case 3.1: user creates and completes a task through the UI

- Scenario from README: full user story including UI and backend.
- Target file: `todo-app/frontend/tests/todo.playwright.spec.js`
- Preconditions: Playwright dependencies are installed.
- Test steps:
  1. Open the frontend in a browser.
  2. Enter a valid task title in the form.
  3. Submit the form.
  4. Assert that the new task appears in the task list.
  5. Click the completion button for the task.
  6. Assert that the button changes from `Mark complete` to `Mark undone`.
  7. Assert that the completed visual state is applied.
- Expected result: the user can create and complete a task from the browser.
- Run:

```powershell
cd c:\Users\2000141082\Module-5-and-6\module-06-test-driven-development\todo-app\frontend
npm run test:e2e
```

## 4. Front-End Testing

### Test Case 4.1: form requires a task title

- Scenario from README: verify React component form validation.
- Target file: `todo-app/frontend/tests/App.test.jsx`
- Preconditions: frontend dependencies are installed.
- Test steps:
  1. Render the app with React Testing Library.
  2. Try to submit the form without a title.
  3. Assert that the title input is required.
  4. Assert that the backend mock is not called for an invalid submit.
- Expected result: empty task titles cannot be submitted.

### Test Case 4.2: valid submit clears inputs

- Scenario from README: verify local state after successful submit.
- Target file: `todo-app/frontend/tests/App.test.jsx`
- Preconditions: frontend dependencies are installed and `fetch` is mocked.
- Test steps:
  1. Render the app.
  2. Enter valid form data.
  3. Submit the form.
  4. Mock a successful backend response.
  5. Assert that input fields are cleared.
- Expected result: form fields reset after a successful task creation.

### Test Case 4.3: completion button updates rendered text

- Scenario from README: verify component state updates after toggle.
- Target file: `todo-app/frontend/tests/App.test.jsx`
- Preconditions: frontend dependencies are installed and `fetch` is mocked.
- Test steps:
  1. Render the app with one incomplete task.
  2. Assert that the task button says `Mark complete`.
  3. Click the button.
  4. Mock a successful toggle response.
  5. Assert that the button says `Mark undone`.
- Expected result: the UI reflects the updated completion state.
- Run:

```powershell
cd c:\Users\2000141082\Module-5-and-6\module-06-test-driven-development\todo-app\frontend
npm test
```

## 5. API Testing

### Test Case 5.1: GET /tasks returns a JSON array

- Scenario from README: contract-level behavior of the Node server.
- Target files:
  - `todo-app/backend/tests/postman/todo-api.postman_collection.json`
  - `todo-app/backend/tests/postman/todo-api.postman_environment.json`
- Preconditions: backend server is running.
- Test steps:
  1. Send `GET /tasks`.
  2. Assert that the status code is `200`.
  3. Assert that the response content type is JSON.
  4. Assert that the response body is an array.
- Expected result: the endpoint returns a valid JSON task list.

### Test Case 5.2: POST /tasks requires title

- Scenario from README: verify API rejects invalid create requests.
- Target files:
  - `todo-app/backend/tests/postman/todo-api.postman_collection.json`
  - `todo-app/backend/tests/postman/todo-api.postman_environment.json`
- Preconditions: backend server is running.
- Test steps:
  1. Send `POST /tasks` without a `title`.
  2. Assert that the status code is `400`.
  3. Assert that the response contains a validation error.
- Expected result: the API rejects requests missing the required title.

### Test Case 5.3: PATCH /tasks/:id/complete returns 404 for missing IDs

- Scenario from README: verify API behavior for missing task IDs.
- Target files:
  - `todo-app/backend/tests/postman/todo-api.postman_collection.json`
  - `todo-app/backend/tests/postman/todo-api.postman_environment.json`
- Preconditions: backend server is running.
- Test steps:
  1. Send `PATCH /tasks/not-found/complete`.
  2. Assert that the status code is `404`.
  3. Assert that the error message explains the task was not found.
- Expected result: the API returns a clear not-found response.
- Run:

```powershell
cd c:\Users\2000141082\Module-5-and-6\module-06-test-driven-development\todo-app\backend
newman run tests/postman/todo-api.postman_collection.json -e tests/postman/todo-api.postman_environment.json
```

## 6. Performance Testing

### Test Case 6.1: POST /tasks handles 50 virtual users

- Scenario from README: ramp to 50 users and measure response time.
- Target file: `todo-app/backend/tests/performance/tasks-post-load.k6.js`
- Preconditions: backend server is running on the configured base URL.
- Test steps:
  1. Start the k6 load test.
  2. Ramp traffic up to 50 virtual users.
  3. Send unique `POST /tasks` payloads.
  4. Track request failures.
  5. Track the 95th percentile response time.
- Expected result: request failures stay below 1% and `p(95)` stays below `500ms`.
- Run:

```powershell
cd c:\Users\2000141082\Module-5-and-6\module-06-test-driven-development\todo-app\backend
k6 run tests/performance/tasks-post-load.k6.js
```

### Test Case 6.2: GET /tasks remains responsive under repeated reads

- Scenario from README: run repeated GET requests and fail if response time is too high.
- Target: performance script or manual Artillery/k6 scenario.
- Preconditions: backend server is running.
- Test steps:
  1. Send 200 sequential or low-concurrency `GET /tasks` requests.
  2. Record response times.
  3. Assert that responses are successful.
  4. Assert that the median response time is under `150ms`.
- Expected result: the task list endpoint remains fast during repeated reads.

## 7. Security Testing

### Test Case 7.1: POST /tasks rejects empty and unsafe titles

- Scenario from README: fuzz task creation with unsafe input.
- Target: `POST /tasks`
- Preconditions: backend server is running.
- Test steps:
  1. Send a missing `title`.
  2. Send an empty `title`.
  3. Send a whitespace-only `title`.
  4. Send a very long `title`.
  5. Send a script-like `title`, such as `<script>alert(1)</script>`.
  6. Assert that invalid payloads return `400` or are safely handled.
- Expected result: unsafe payloads do not create tasks and do not crash the server.

### Test Case 7.2: API does not execute or reflect script-like notes unsafely

- Scenario from README: check payload sanitization and injection resistance.
- Target: `POST /tasks` and frontend task rendering.
- Preconditions: backend and frontend are running.
- Test steps:
  1. Create a task with script-like content in `notes`.
  2. Load the task list in the UI.
  3. Assert that the content is displayed as text if accepted.
  4. Assert that no script executes in the browser.
- Expected result: script-like content is escaped or rejected safely.

### Test Case 7.3: CORS policy allows only expected frontend access

- Scenario from README: verify CORS behavior.
- Target: backend CORS configuration.
- Preconditions: backend server is running.
- Test steps:
  1. Send a request from the configured frontend origin.
  2. Assert that the request is allowed.
  3. Send a request with an unexpected origin header.
  4. Verify that the CORS behavior matches the app requirement.
- Expected result: CORS is configured intentionally and does not expose the API more broadly than required.

## 8. Regression Testing

### Test Case 8.1: create and toggle regression suite passes

- Scenario from README: replay unit, integration, and UI tests after updates.
- Target files:
  - `todo-app/backend/tests/run-backend-tests.ps1`
  - `todo-app/frontend/tests/run-frontend-tests.ps1`
  - `testing-prompts/regression/README.md`
- Preconditions: backend and frontend dependencies are installed.
- Test steps:
  1. Run the backend and frontend regression scripts.
  2. Confirm the unit toggle test passes.
  3. Confirm the integration create/list test passes.
  4. Confirm the frontend component tests pass.
  5. Confirm the end-to-end create/toggle flow passes if the required servers are available.
- Expected result: all regression checks for create and toggle behavior pass.
- Run:

```powershell
cd c:\Users\2000141082\Module-5-and-6\module-06-test-driven-development\todo-app\backend
npm run test:all
```

```powershell
cd c:\Users\2000141082\Module-5-and-6\module-06-test-driven-development\todo-app\frontend
npm run test:all
```

### Test Case 8.2: CI runs regression checks after code changes

- Scenario from README: outline pipeline coverage after every deployment or pull request.
- Target: GitHub Actions or equivalent CI configuration.
- Preconditions: CI runner can install dependencies and run Node commands.
- Test steps:
  1. Trigger the pipeline from a pull request or deployment branch.
  2. Install backend dependencies.
  3. Install frontend dependencies.
  4. Run backend Jest tests.
  5. Run frontend Vitest tests.
  6. Run Playwright tests when browser dependencies are available.
- Expected result: the pipeline fails if any core create or toggle behavior regresses.

## 9. Smoke Testing

### Test Case 9.1: backend health smoke check can list tasks

- Scenario from README: hit `/tasks` once to ensure the server starts.
- Target: `GET /tasks`
- Preconditions: backend server is running.
- Test steps:
  1. Send `GET http://localhost:5100/tasks`.
  2. Assert that the server responds.
  3. Assert that the response status is `200`.
  4. Assert that the response body is JSON.
- Expected result: the backend is reachable and the task endpoint is available.

### Test Case 9.2: backend smoke check can create one task

- Scenario from README: one quick `POST /tasks` sanity check.
- Target: `POST /tasks`
- Preconditions: backend server is running.
- Test steps:
  1. Send `POST /tasks` with a valid title.
  2. Assert that the status code is `201`.
  3. Assert that the response contains the created title.
- Expected result: the backend can accept a basic task creation request.

### Test Case 9.3: frontend dev server loads the home page

- Scenario from README: launch Vite, navigate to `/`, and check the page loads.
- Target file: `todo-app/frontend/tests/dev-server.smoke.js`
- Preconditions: frontend dependencies are installed.
- Test steps:
  1. Run the smoke script.
  2. Wait for the Vite dev server.
  3. Navigate to the home page.
  4. Assert that the main heading is visible.
  5. Assert that the `Task title` input is visible.
- Expected result: the frontend starts and renders the main ToDo screen.
- Run:

```powershell
cd c:\Users\2000141082\Module-5-and-6\module-06-test-driven-development\todo-app\frontend
npm run test:smoke
```

## 10. Acceptance Testing

### Test Case 10.1: user adds a task and sees it stored

- Scenario from README: business-level create-task requirement.
- Target files:
  - `testing-prompts/acceptance-test-cases.md`
  - `testing-prompts/qa-checklist.md`
- Preconditions: backend and frontend are running.
- Test steps:
  1. Open the ToDo app.
  2. Enter a valid task title.
  3. Submit the form.
  4. Confirm the task appears in the UI.
  5. Refresh the page.
  6. Confirm the task still appears after data is reloaded from the backend.
- Expected result: the task is saved through the UI and available from backend-backed state.

### Test Case 10.2: user toggles completion and sees persisted state

- Scenario from README: business-level completion requirement.
- Target files:
  - `testing-prompts/acceptance-test-cases.md`
  - `testing-prompts/qa-checklist.md`
- Preconditions: at least one task exists.
- Test steps:
  1. Click `Mark complete` for an incomplete task.
  2. Confirm the task appears completed.
  3. Refresh the page.
  4. Confirm the task remains completed.
  5. Click `Mark undone`.
  6. Refresh the page again.
  7. Confirm the task returns to incomplete state.
- Expected result: completion changes are saved and remain correct after reload.

### Test Case 10.3: Cucumber-style acceptance scenario

- Scenario from README: describe the user journey in business language.
- Target: acceptance test documentation.
- Preconditions: product owner or QA reviewer has access to the app.
- Test steps:
  1. Given the user is on the ToDo app.
  2. When the user submits a valid task.
  3. Then the task appears in the list.
  4. When the user marks the task completed.
  5. Then the completed state is shown and retained.
- Expected result: the app satisfies the core create and complete user journey.

## Notes

- Backend default used by these cases: `http://localhost:5100`
- Frontend Vite server used by these cases: `http://localhost:5179`
- Full execution guide: `testing-prompts/run-testcases.md`
