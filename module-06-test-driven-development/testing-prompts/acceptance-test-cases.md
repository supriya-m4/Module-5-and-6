# Acceptance Test Cases

Use these acceptance cases with `testing-prompts/qa-checklist.md`. The same flows are automated in `todo-app/frontend/tests/todo.playwright.spec.js`.

## AC-1: User adds a task and sees it stored

- Given the backend and frontend are running
- When the user enters a valid task title and submits the form
- Then the task appears in the list
- And the task is returned again after the page reloads

## AC-2: User toggles completion and sees persisted state

- Given at least one task exists
- When the user clicks `Mark complete`
- Then the task shows completed styling
- And the button changes to `Mark undone`
- When the page reloads
- Then the task still appears completed
- When the user clicks `Mark undone`
- Then the task returns to the incomplete state

## AC-3: User gets feedback for invalid or failed requests

- Given the user is on the ToDo app
- When the user tries to submit without a title
- Then submission is blocked by the required title field
- When the backend request fails
- Then the UI displays an error message and remains usable
