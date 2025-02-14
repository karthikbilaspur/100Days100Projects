const jwt = require('jsonwebtoken');

const secretKey = 'your-secret-key';

async function authenticateUser(username, password) {
    // Replace with your own authentication logic
    const user = { id: 1, username, password };
    const token = jwt.sign(user, secretKey);
    return token;
}

async function verifyToken(token) {
    try {
        const decoded = jwt.verify(token, secretKey);
        return decoded;
    } catch (error) {
        return null;
    }
}

module.exports = { authenticateUser, verifyToken };