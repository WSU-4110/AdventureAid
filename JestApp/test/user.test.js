const { signup, loginuser } = require('../../server/userdata');
const User = require('../../server/schemas/signupdata');
const bcheck = require('../../server/api/bcheck');
const jwt = require('jsonwebtoken');

jest.mock('../../server/schemas/signupdata');
jest.mock('../../server/api/bcheck');
jest.mock('jsonwebtoken');

describe('User Authentication Tests', () => {
    const mockResponse = () => {
        const res = {};
        res.status = jest.fn().mockReturnValue(res);
        res.json = jest.fn().mockReturnValue(res);
        return res;
    };

    beforeEach(() => {
        // Reset mocks before each test
        User.findOne.mockReset();
        bcheck.hash.mockReset();
        bcheck.compare.mockReset();
        jwt.sign.mockReset();
    });

    describe('signup function', () => {
        it('should register a new user successfully', async () => {
            User.findOne.mockResolvedValue(null);
            bcheck.hash.mockResolvedValue('hashed_password');

            const req = {
                body: { email: 'newuser@example.com', password: 'password123' }
            };
            const res = mockResponse();

            await signup(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ message: "Registered Successfully" });
        });

        it('should handle registration with existing email', async () => {
            User.findOne.mockResolvedValue({ email: 'existinguser@example.com' });

            const req = {
                body: { email: 'existinguser@example.com', password: 'password123' }
            };
            const res = mockResponse();

            await signup(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ message: "User Already exists" });
        });

        it('should handle errors during user creation', async () => {
            User.findOne.mockResolvedValue(null);
            bcheck.hash.mockRejectedValue(new Error('Hashing failed'));

            const req = {
                body: { email: 'user@example.com', password: 'password123' }
            };
            const res = mockResponse();

            await signup(req, res);

            expect(res.status).toHaveBeenCalledWith(500); // Adjust according to your error handling
            expect(res.json).toHaveBeenCalledWith({ message: "Error during user registration" });
        });
    });

    describe('loginuser function', () => {
        it('should log in a user successfully', async () => {
            User.findOne.mockResolvedValue({ email: 'user@example.com', password: 'hashed_password' });
            bcheck.compare.mockResolvedValue(true);
            jwt.sign.mockReturnValue('token');

            const req = {
                body: { email: 'user@example.com', password: 'password123' }
            };
            const res = mockResponse();

            await loginuser(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
                message: "Logged in",
                Token: expect.any(String)
            }));
        });

        it('should handle login with non-existing user', async () => {
            User.findOne.mockResolvedValue(null);

            const req = {
                body: { email: 'nonexisting@example.com', password: 'password123' }
            };
            const res = mockResponse();

            await loginuser(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ message: "User not founds" });
        });

        it('should handle login with incorrect password', async () => {
            User.findOne.mockResolvedValue({ email: 'user@example.com', password: 'hashed_password' });
            bcheck.compare.mockResolvedValue(false);

            const req = {
                body: { email: 'user@example.com', password: 'wrongpassword' }
            };
            const res = mockResponse();

            await loginuser(req, res);

            expect(res.status).toHaveBeenCalledWith(401);
            expect(res.json).toHaveBeenCalledWith({ message: "Username and Password not match" });
        });

    });
});
