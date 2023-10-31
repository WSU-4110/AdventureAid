const bcrypt = require('bcryptjs');

class PasswordUtility {
    static async hash(password) {
        try {
            const hashedPassword = await bcrypt.hash(password, 10);  // added salt
            return hashedPassword;
        } catch (err) {
            console.error(err);
            throw new Error('Hashing failed');
        }
    }

    static async compare(password, userPassword) {
        try {
            const isMatch = await bcrypt.compare(password, userPassword);
            if (isMatch) {
                console.log('Correct password');
            } else {
                console.log('Incorrect password');
            }
            return isMatch;
        } catch (err) {
            console.error(err);
            throw new Error('Comparison failed');
        }
    }
}

module.exports = PasswordUtility;
