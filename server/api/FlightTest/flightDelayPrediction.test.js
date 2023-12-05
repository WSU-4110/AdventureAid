const supertest = require('supertest');
const app = require('../../app');

describe('Flight Delay Prediction API', () => {
    describe('GET /api/flightDelayPrediction', () => {
        test('should respond with a 200 status code for valid request', async () => {
            const response = await supertest(app).get('/api/flightDelayPrediction').query({
                originLocationCode: 'NCE',
                destinationLocationCode: 'IST',
                departureDate: '2020-08-01',
                departureTime: '18:20:00',
                arrivalDate: '2020-08-01',
                arrivalTime: '22:15:00',
                aircraftCode: '321',
                carrierCode: 'TK',
                flightNumber: '1816',
                duration: 'PT31H10M'
            });
            expect(response.statusCode).toBe(200);
        });

        test('should respond with a 400 status code for invalid request', async () => {
            const response = await supertest(app).get('/api/flightDelayPrediction').query({});
            expect(response.statusCode).toBe(400);
        });

        // Add more tests to cover different scenarios like authentication failure, API errors, etc.
    });
});
