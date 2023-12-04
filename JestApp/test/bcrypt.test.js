const bcrypt = require('bcryptjs');
const { hash,compare } =require('../../server/api/bcheck'); 

describe('hash function', () => {
    it('should generate a hashed password', async () => {
        const password = 'myPassword123';
        const hashedPassword = await hash(password);

        // Check if the hashed password is not null or undefined
        expect(hashedPassword).toBeDefined();

        // Check if the hashed password is not the same as the original password
        expect(hashedPassword).not.toBe(password);

        // Check if the hashed password is a valid bcrypt hash
        const isBcryptHash = hashedPassword.startsWith('$2a$') || hashedPassword.startsWith('$2b$') || hashedPassword.startsWith('$2y$');
        expect(isBcryptHash).toBeTruthy();
    });
});
describe('compare function', () => {
    it('should return true for a matching password', async () => {
        const password = 'myPassword123';
        const hashedPassword = await hash(password);
        const result = await compare(password, hashedPassword);

        // Check if the comparison result is true
        expect(result).toBe(true);
    });

    it('should return false for a non-matching password', async () => {
        const password = 'myPassword123';
        const wrongPassword = 'wrongPassword123';
        const hashedPassword = await hash(password);
        const result = await compare(wrongPassword, hashedPassword);

        // Check if the comparison result is false
        expect(result).toBe(false);
        // testing
    });
});