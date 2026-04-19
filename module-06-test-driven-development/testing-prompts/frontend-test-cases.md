# Frontend Test Cases

This file summarizes the runnable frontend coverage. The full testcase catalogue is in `testing-prompts/test-cases.md`.

## React Testing Library

Target file: `todo-app/frontend/tests/App.test.jsx`

Coverage:
- The task title input is required.
- Valid submit clears title, due date, and notes fields.
- Completion toggle changes the button from `Mark complete` to `Mark undone`.
- Completed tasks receive completed styling.
- Backend request failures display an error message instead of crashing the page.

Run:

```powershell
cd c:\Users\2000141082\Module-5-and-6\module-06-test-driven-development\todo-app\frontend
npm test
```

## End-to-end Playwright

Target file: `todo-app/frontend/tests/todo.playwright.spec.js`

Config file:
- `todo-app/frontend/playwright.config.cjs`

Coverage:
- Starts the backend and frontend automatically.
- Creates a task through the UI.
- Confirms the task appears with notes.
- Toggles completion.
- Reloads the page and confirms completion state remains visible.
- Toggles the task back to incomplete.

Run:

```powershell
cd c:\Users\2000141082\Module-5-and-6\module-06-test-driven-development\todo-app\frontend
npm run test:e2e
```

## Smoke testing

Target file: `todo-app/frontend/tests/dev-server.smoke.js`

Coverage:
- Starts the Vite dev server.
- Opens the home page.
- Confirms the main heading and `Task title` input render.

Run:

```powershell
cd c:\Users\2000141082\Module-5-and-6\module-06-test-driven-development\todo-app\frontend
npm run test:smoke
```

## Frontend runner

Target file: `todo-app/frontend/tests/run-frontend-tests.ps1`

Run:

```powershell
cd c:\Users\2000141082\Module-5-and-6\module-06-test-driven-development\todo-app\frontend
npm run test:all
```
