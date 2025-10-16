const http = require('http');

const BASE_URL = 'http://localhost:3000';

function makeRequest(method, path, body = null) {
  const url = new URL(path, BASE_URL);

  return new Promise((resolve, reject) => {
    const options = {
      method: method,
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'NestJS-Interview-Test'
      },
    };

    const req = http.request(url, options, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        console.log(`\n${method} ${path}`);
        console.log(`Status: ${res.statusCode}`);

        try {
          const parsed = JSON.parse(data || '{}');
          console.log('Response:', JSON.stringify(parsed, null, 2));
          resolve(parsed);
        } catch (e) {
          console.log('Response:', data);
          resolve(data);
        }
        console.log('-'.repeat(50));
      });
    });

    req.on('error', reject);

    if (body) {
      req.write(JSON.stringify(body));
    }

    req.end();
  });
}

async function testAPI() {
  console.log('Testing Task Management API');
  console.log(`Base URL: ${BASE_URL}\n`);

  try {
    // Test 1: Create a task
    console.log('Test 1: Creating some tasks...');
    const newTask1 = await makeRequest('POST', '/tasks', {
      title: 'Interview Test Task 1',
      description: 'Testing the NestJS API implementation',
      priority: 'LOW',
      dueDate: '2025-12-31T23:59:59.000Z'
    });

    const newTask2 = await await makeRequest('POST', '/tasks', {
      title: 'Interview Test Task 2',
      description: 'Testing the NestJS API implementation',
      priority: 'HIGH',
      dueDate: '2025-07-10T23:59:59.000Z'
    });
    
    // Test 2: Get all tasks
    console.log('Test 2: Fetching all tasks...');
    await makeRequest('GET', '/tasks');

    // Test 3: Filter tasks by priority
    console.log('Test 3: Filter by priority...');
    await makeRequest('GET', '/tasks?priority=HIGH');

    // Test 4: Get task by ID
    if (newTask1 && newTask1.id) {
      console.log('Test 4: Fetching task by ID...');
      await makeRequest('GET', `/tasks/${newTask1.id}`);
    }

    // Test 5: Update task
    if (newTask1 && newTask1.id) {
      console.log('Test 5: Updating task...');
      await makeRequest('PUT', `/tasks/${newTask1.id}`, {
        status: 'IN_PROGRESS'
      });

      await makeRequest('GET', '/tasks');
    }

    // Test 6: Delete the tasks
    if (newTask1 && newTask1.id) {
      console.log('Test 6: Deleting task 1...');
      await makeRequest('DELETE', `/tasks/${newTask1.id}`);

      // verify deletion
      await makeRequest('GET', '/tasks');
    }

    if (newTask2 && newTask2.id) {
      console.log('Test 6: Deleting task 2...');
      await makeRequest('DELETE', `/tasks/${newTask2.id}`);

      // verify deletion
      await makeRequest('GET', '/tasks');
    }
    
    console.log('\nAll tests completed successfully!');
  } catch (error) {
    console.error('\nTest failed:', error.message);
  }
}

// Wait for server to start, then run tests
console.log('⏳ Waiting for server to start...');
setTimeout(testAPI, 3000);