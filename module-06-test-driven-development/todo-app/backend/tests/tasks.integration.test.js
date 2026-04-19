const http = require('http');
const { app, tasks } = require('../src/index');

let server;
let baseUrl;

function requestJson(path, options = {}) {
  const url = new URL(path, baseUrl);
  const body = options.body ? JSON.stringify(options.body) : undefined;

  return new Promise((resolve, reject) => {
    const request = http.request(
      url,
      {
        method: options.method || 'GET',
        headers: {
          ...(body ? { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(body) } : {}),
          ...(options.headers || {})
        }
      },
      (response) => {
        const chunks = [];

        response.on('data', (chunk) => chunks.push(chunk));
        response.on('end', () => {
          const text = Buffer.concat(chunks).toString('utf8');
          const payload = text ? JSON.parse(text) : null;
          resolve({
            status: response.statusCode,
            headers: response.headers,
            body: payload
          });
        });
      }
    );

    request.on('error', reject);

    if (body) {
      request.write(body);
    }

    request.end();
  });
}

describe('@regression @backend @integration tasks API integration', () => {
  beforeAll((done) => {
    server = app.listen(0, '127.0.0.1', () => {
      const address = server.address();
      baseUrl = `http://127.0.0.1:${address.port}`;
      done();
    });
  });

  afterAll((done) => {
    server.close(done);
  });

  beforeEach(() => {
    tasks.splice(0, tasks.length);
  });

  test('@regression @api GET /tasks returns a JSON array', async () => {
    const response = await requestJson('/tasks');

    expect(response.status).toBe(200);
    expect(response.headers['content-type']).toContain('application/json');
    expect(response.body).toEqual([]);
  });

  test('@regression @create POST /tasks creates a task and GET /tasks returns it as uncompleted', async () => {
    const payload = {
      title: 'Write integration tests',
      due: '2026-04-20',
      notes: 'Verify persistence through the API'
    };

    const postResponse = await requestJson('/tasks', {
      method: 'POST',
      body: payload
    });

    expect(postResponse.status).toBe(201);
    expect(postResponse.body).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        title: payload.title,
        due: payload.due,
        notes: payload.notes,
        completed: false,
        createdAt: expect.any(String)
      })
    );

    const getResponse = await requestJson('/tasks');

    expect(getResponse.status).toBe(200);
    expect(getResponse.body).toEqual([
      expect.objectContaining({
        id: postResponse.body.id,
        title: payload.title,
        completed: false
      })
    ]);
  });

  test('@regression @toggle POST then PATCH /tasks/:id/complete toggles a task', async () => {
    const createResponse = await requestJson('/tasks', {
      method: 'POST',
      body: { title: 'Toggle through API' }
    });

    const toggleResponse = await requestJson(`/tasks/${createResponse.body.id}/complete`, {
      method: 'PATCH'
    });

    expect(toggleResponse.status).toBe(200);
    expect(toggleResponse.body).toEqual(
      expect.objectContaining({
        id: createResponse.body.id,
        completed: true
      })
    );
  });

  test('@regression @api POST /tasks requires title', async () => {
    const response = await requestJson('/tasks', {
      method: 'POST',
      body: { notes: 'Missing title' }
    });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: 'Task title is required.' });
    expect(tasks).toEqual([]);
  });

  test('@regression @api PATCH /tasks/:id/complete returns 404 for missing IDs', async () => {
    const response = await requestJson('/tasks/not-found/complete', {
      method: 'PATCH'
    });

    expect(response.status).toBe(404);
    expect(response.body).toEqual({ error: 'Task not found.' });
  });

  test('@security POST /tasks safely handles script-like notes as text', async () => {
    const response = await requestJson('/tasks', {
      method: 'POST',
      body: {
        title: 'Security test',
        notes: '<script>alert(1)</script>'
      }
    });

    expect(response.status).toBe(201);
    expect(response.body.notes).toBe('<script>alert(1)</script>');
  });
});
