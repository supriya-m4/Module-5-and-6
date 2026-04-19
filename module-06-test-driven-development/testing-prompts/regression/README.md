# Regression Suite

This suite replays the create and toggle flows across:

- Backend unit tests
- Backend integration tests
- Frontend React Testing Library tests
- Frontend Playwright end-to-end tests

## Tags for pipeline pickup

- `@regression`: include in the regression lane
- `@create`: create-task flow coverage
- `@toggle`: completion-toggle flow coverage
- `@unit`, `@integration`, `@ui`, `@e2e`, `@backend`, `@frontend`: layer tags

## Runners

Backend-owned regression checks live under `todo-app/backend/tests`:

```powershell
cd c:\Users\2000141082\Module-5-and-6\module-06-test-driven-development\todo-app\backend
npm run test:all
```

Frontend-owned regression checks live under `todo-app/frontend/tests`:

```powershell
cd c:\Users\2000141082\Module-5-and-6\module-06-test-driven-development\todo-app\frontend
npm run test:all
```

Make sure the required test dependencies are installed first. The Playwright config starts the backend and frontend automatically for the end-to-end lane.
