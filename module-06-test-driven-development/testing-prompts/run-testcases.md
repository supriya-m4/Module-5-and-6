# How To Run Test Cases

Use these commands from `c:\Users\2000141082\Module-5-and-6\module-06-test-driven-development\todo-app`.

## One-time setup

Install dependencies for each app:

```powershell
cd backend
npm install
```

```powershell
cd ..\frontend
npm install
npx playwright install
```

## 1. Backend unit tests

Runs validation and completion-toggle unit coverage from `testing-prompts/test-cases.md`.

```powershell
cd c:\Users\2000141082\Module-5-and-6\module-06-test-driven-development\todo-app\backend
npm run test:unit
```

## 2. Backend integration and API tests

Runs create/list, POST validation, missing-toggle ID, and security-oriented script-like payload checks.

```powershell
cd c:\Users\2000141082\Module-5-and-6\module-06-test-driven-development\todo-app\backend
npm run test:integration
```

Run all backend Jest tests:

```powershell
cd c:\Users\2000141082\Module-5-and-6\module-06-test-driven-development\todo-app\backend
npm test
```

## 3. Frontend React tests

Runs React Testing Library coverage for required title, cleared inputs, toggle text/styling, and backend error display.

```powershell
cd c:\Users\2000141082\Module-5-and-6\module-06-test-driven-development\todo-app\frontend
npm test
```

## 4. End-to-end Playwright test

The Playwright config starts the backend on `http://127.0.0.1:5100` and the frontend on `http://127.0.0.1:5179`.

```powershell
cd c:\Users\2000141082\Module-5-and-6\module-06-test-driven-development\todo-app\frontend
npm run test:e2e
```

## 5. Frontend smoke test

The smoke script starts and stops the Vite dev server by itself.

```powershell
cd c:\Users\2000141082\Module-5-and-6\module-06-test-driven-development\todo-app\frontend
npm run test:smoke
```

## 6. Postman/Newman API tests

Start the backend:

```powershell
cd c:\Users\2000141082\Module-5-and-6\module-06-test-driven-development\todo-app\backend
$env:PORT=5100
npm start
```

Run the collection from another terminal:

```powershell
cd c:\Users\2000141082\Module-5-and-6\module-06-test-driven-development\todo-app\backend
newman run tests/postman/todo-api.postman_collection.json -e tests/postman/todo-api.postman_environment.json
```

## 7. k6 performance test

Start the backend, then run:

```powershell
cd c:\Users\2000141082\Module-5-and-6\module-06-test-driven-development\todo-app\backend
k6 run tests/performance/tasks-post-load.k6.js
```

## 8. Backend and frontend all-test scripts

Run all backend-owned test scripts:

```powershell
cd c:\Users\2000141082\Module-5-and-6\module-06-test-driven-development\todo-app\backend
npm run test:all
```

Run all frontend-owned test scripts:

```powershell
cd c:\Users\2000141082\Module-5-and-6\module-06-test-driven-development\todo-app\frontend
npm run test:all
```

## Notes

- Canonical testcase list: `testing-prompts/test-cases.md`
- Backend default port: `5100`
- Frontend Vite port: `5179`
- Postman/Newman and k6 are optional external tools and must be installed separately if you want those lanes.
