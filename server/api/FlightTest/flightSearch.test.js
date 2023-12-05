const supertest = require('supertest');
const app = require('../../app'); // express app

describe('Flight Search API', () => {
    describe('GET /api/flightSearch/flight-offers', () => {
        test('should respond with a 200 status code for a valid request', async () => {
            const response = await supertest(app).get('/api/flightSearch/flight-offers').query({
                origin: 'NYC',
                destination: 'LAX',
                departureDate: '2023-10-25',
                adults: '1'
            });
            expect(response.statusCode).toBe(200);
        });

        test('should respond with a 400 status code for a request missing required parameters', async () => {
            const response = await supertest(app).get('/api/flightSearch/flight-offers').query({
                destination: 'LAX',
                departureDate: '2023-10-25',
                adults: '1'
            });
            expect(response.statusCode).toBe(400);
        });

        // Add more tests to cover other scenarios, such as handling different parameters, etc.
    });
});
