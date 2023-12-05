const supertest = require('supertest');
const app = require('../../app'); // express app 

describe('Flight Status API', () => {
    describe('GET /api/flightStatus/flight-status', () => {
        test('should respond with a 200 status code for a valid request', async () => {
            const response = await supertest(app).get('/api/flightStatus/flight-status').query({
                carrierCode: 'AA',
                flightNumber: '2374',
                scheduledDepartureDate: '2023-10-20'
            });
            expect(response.statusCode).toBe(200);
        });

        test('should respond with a 400 status code for a request missing required parameters', async () => {
            const response = await supertest(app).get('/api/flightStatus/flight-status').query({});
            expect(response.statusCode).toBe(400);
        });

        // Additional tests can be added here to cover other scenarios,
        // such as invalid parameter values, server errors, etc.
    });
});
