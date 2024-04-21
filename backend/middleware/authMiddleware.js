const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(401).json({ message: 'Authorization header missing' });
    }
    const token = req.headers.authorization.split(' ')[1];
    jwt.verify(token, '323ad7bc756174c0d7eb12268f9180a51a928c3f573b931d98ba03ed1d9aef2d', (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Invalid token' });
        }
        req.user = decoded;
        next();
    });
};

module.exports = { authenticate };
