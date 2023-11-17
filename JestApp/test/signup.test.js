const mongoose = require('mongoose');
const User = require('../../server/schemas/signupdata'); // Update the path as necessary

// Mock Mongoose save function
mongoose.Model.prototype.save = jest.fn().mockImplementation(function() {
    // Mock implementation logic
    // Add your actual validation logic as per your User schema
    const isValidEmail = this.email.includes('@');
    const isPasswordLongEnough = this.password.length >= 6; // Example: minimum password length of 6
    return (isValidEmail && isPasswordLongEnough) ? Promise.resolve(this) : Promise.reject(new Error('Validation Error'));
});

describe('User Schema', () => {
    it('should validate and save a user successfully', async () => {
        const userData = { email: 'test@example.com', password: '123456' };
        const user = new User(userData);

        await user.save();

        expect(mongoose.Model.prototype.save).toHaveBeenCalled();
        expect(user.email).toBe(userData.email);
        expect(user.password).toBe(userData.password);
    });

    it('should throw validation error for invalid data', async () => {
        const userData = { email: 'invalidEmail', password: '' };
        const user = new User(userData);

        try {
            await user.save();
            fail('Expected save function to throw an error');
        } catch (error) {
            expect(error).toBeInstanceOf(Error);
            expect(error.message).toBe('Validation Error');
        }
    });

    it('should throw validation error for too short password', async () => {
        const userData = { email: 'user@example.com', password: '123' }; // Password too short
        const user = new User(userData);

        try {
            await user.save();
            fail('Expected save function to throw an error for short password');
        } catch (error) {
            expect(error).toBeInstanceOf(Error);
            expect(error.message).toBe('Validation Error');
            expect(user.password.length).toBeLessThan(6);
        }
    });
});
