const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(401).json({ message: 'Authorization header missing' });
    }
    const token = req.headers.authorization.split(' ')[1];
    jwt.verify(token, 'c73398b1e5bc78257c2348c84c20402656d18b904a53636e79c398fbcaf3aecb', (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Invalid token' });
        }
        req.user = decoded;
        next();
    });
};

module.exports = { authenticate };
