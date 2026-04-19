import http from 'k6/http';
import { check, sleep } from 'k6';

const baseUrl = __ENV.BASE_URL || 'http://localhost:5100';

export const options = {
  stages: [
    { duration: '30s', target: 10 },
    { duration: '30s', target: 25 },
    { duration: '30s', target: 50 },
    { duration: '30s', target: 50 },
    { duration: '20s', target: 0 }
  ],
  thresholds: {
    http_req_failed: ['rate<0.01'],
    http_req_duration: ['p(95)<500']
  }
};

export default function () {
  const uniqueId = `${__VU}-${__ITER}-${Date.now()}`;
  const payload = JSON.stringify({
    title: `k6 task ${uniqueId}`,
    due: '2026-04-30',
    notes: `Performance run from virtual user ${__VU}`
  });

  const params = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const response = http.post(`${baseUrl}/tasks`, payload, params);

  check(response, {
    'POST /tasks returns 201': (res) => res.status === 201,
    'response is json': (res) => res.headers['Content-Type'] && res.headers['Content-Type'].includes('application/json'),
    'created task is uncompleted': (res) => {
      const body = res.json();
      return body && body.completed === false;
    }
  });

  sleep(1);
}
