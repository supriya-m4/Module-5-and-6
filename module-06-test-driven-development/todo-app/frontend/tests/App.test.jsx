import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import '@testing-library/jest-dom/vitest';
import { cleanup, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../src/App';

function createJsonResponse(body, ok = true) {
  return {
    ok,
    statusText: ok ? 'OK' : 'Bad Request',
    json: async () => body
  };
}

describe('@regression @frontend @ui App form and completion behavior', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  afterEach(() => {
    cleanup();
    vi.unstubAllGlobals();
  });

  it('@regression @create marks the task title input as required', async () => {
    const fetchMock = vi.fn().mockResolvedValue(createJsonResponse([]));
    vi.stubGlobal('fetch', fetchMock);

    render(<App />);

    const titleInput = await screen.findByLabelText('Task title');
    expect(titleInput).toBeRequired();
    expect(titleInput).toBeInvalid();
    expect(fetchMock).toHaveBeenCalledWith('http://localhost:5100/tasks', undefined);
  });

  it('@regression @create clears the form inputs after a valid submission', async () => {
    const createdTask = {
      id: 'task-1',
      title: 'Write RTL tests',
      due: '2026-04-20',
      notes: 'Confirm the inputs reset',
      completed: false,
      createdAt: '2026-04-16T10:00:00.000Z'
    };

    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(createJsonResponse([]))
      .mockResolvedValueOnce(createJsonResponse(createdTask));

    vi.stubGlobal('fetch', fetchMock);

    render(<App />);

    const user = userEvent.setup();
    const titleInput = await screen.findByLabelText('Task title');
    const dueInput = screen.getByLabelText('Optional due date');
    const notesInput = screen.getByLabelText('Notes/details');

    await user.type(titleInput, createdTask.title);
    await user.type(dueInput, createdTask.due);
    await user.type(notesInput, createdTask.notes);
    await user.click(screen.getByRole('button', { name: 'Save task to backend' }));

    await screen.findByText('Task saved to the backend.');

    expect(titleInput).toHaveValue('');
    expect(dueInput).toHaveValue('');
    expect(notesInput).toHaveValue('');

    await waitFor(() => {
      expect(fetchMock).toHaveBeenNthCalledWith(
        2,
        'http://localhost:5100/tasks',
        expect.objectContaining({
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            title: createdTask.title,
            due: createdTask.due,
            notes: createdTask.notes
          })
        })
      );
    });
  });

  it('@regression @toggle toggles the completion button text after pressing it', async () => {
    const initialTask = {
      id: 'task-2',
      title: 'Toggle me',
      due: null,
      notes: '',
      completed: false,
      createdAt: '2026-04-16T10:00:00.000Z'
    };

    const completedTask = {
      ...initialTask,
      completed: true
    };

    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(createJsonResponse([initialTask]))
      .mockResolvedValueOnce(createJsonResponse(completedTask));

    vi.stubGlobal('fetch', fetchMock);

    render(<App />);

    const user = userEvent.setup();
    const toggleButton = await screen.findByRole('button', { name: 'Mark complete' });

    expect(toggleButton).toHaveTextContent('Mark complete');

    await user.click(toggleButton);

    await waitFor(() => {
      expect(fetchMock).toHaveBeenNthCalledWith(
        2,
        'http://localhost:5100/tasks/task-2/complete',
        expect.objectContaining({
          method: 'PATCH'
        })
      );
    });

    expect(await screen.findByRole('button', { name: 'Mark undone' })).toBeInTheDocument();
    expect(screen.getByText(initialTask.title).closest('article')).toHaveClass('completed');
  });

  it('@regression @frontend displays a useful error when the backend request fails', async () => {
    const fetchMock = vi.fn().mockRejectedValue(new Error('Backend unavailable'));
    vi.stubGlobal('fetch', fetchMock);

    render(<App />);

    expect(await screen.findByText('Backend unavailable')).toHaveClass('error');
  });
});
