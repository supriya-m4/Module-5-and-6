const { tasks, validateTaskPayload } = require('../src/index');

function toggleTaskCompletion(task) {
  task.completed = !task.completed;
  return task;
}

describe('@regression @backend @unit task validation and toggle behavior', () => {
  beforeEach(() => {
    tasks.splice(0, tasks.length);
  });

  test('@regression @validation accepts a valid task title', () => {
    expect(validateTaskPayload({ title: 'Write tests' })).toBeNull();
    expect(validateTaskPayload({ title: '  Trimmed title  ', notes: 'Optional' })).toBeNull();
  });

  test('@regression @validation rejects a missing title', () => {
    expect(validateTaskPayload({})).toBe('Task title is required.');
    expect(validateTaskPayload(null)).toBe('Task title is required.');
  });

  test('@regression @validation rejects a whitespace-only title', () => {
    expect(validateTaskPayload({ title: '' })).toBe('Task title is required.');
    expect(validateTaskPayload({ title: '   ' })).toBe('Task title is required.');
  });

  test('@regression @toggle flips task.completed from false to true and back to false', () => {
    const task = {
      id: 'task-1',
      title: 'Unit test task',
      completed: false
    };

    expect(toggleTaskCompletion(task).completed).toBe(true);
    expect(toggleTaskCompletion(task).completed).toBe(false);
  });
});
