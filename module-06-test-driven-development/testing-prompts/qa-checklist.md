# QA Checklist

Use this checklist to verify the full ToDo flow across the React frontend and Node backend.

## Setup

- Start the backend and confirm it is listening on `http://localhost:5100`.
- Start the frontend and confirm it is available on `http://localhost:5179`.
- Open the app in a browser with the backend running.

## Form submission

- Confirm the page shows the task form with `Task title`, `Optional due date`, and `Notes/details`.
- Try submitting the form with an empty title and confirm the form does not submit.
- Enter a valid task title and submit the form.
- Enter a valid task title, due date, and notes, then submit the form.
- Confirm the success message `Task saved to the backend.` appears after a valid submission.
- Confirm the form fields clear after a successful submission.

## Backend data sharing

- After submitting a task, confirm the new task appears in the task list.
- Confirm the task list count increases after the task is added.
- Confirm the saved task title matches what was entered in the form.
- Confirm the saved due date matches what was entered in the form.
- Confirm the saved notes match what was entered in the form.
- Confirm the new task is initially shown as not completed.
- Refresh the page and confirm the saved task is still returned from the backend and displayed in the list.

## Completion toggle persistence

- Confirm a newly created task shows a `Mark complete` button.
- Click `Mark complete` and confirm the button text changes to `Mark undone`.
- Confirm the task card shows the completed visual state after toggling.
- Refresh the page and confirm the same task still appears completed.
- Click `Mark undone` and confirm the button text changes back to `Mark complete`.
- Refresh the page again and confirm the task remains not completed.

## Error and sanity checks

- Stop the backend and refresh the frontend to confirm an error state is shown instead of a silent failure.
- Restart the backend and confirm the frontend can load tasks again.
- Confirm creating multiple tasks keeps the newest task visible in the list.

## Result

- Mark the checklist as passed only if create, load, refresh, and toggle behaviors all work end to end.
