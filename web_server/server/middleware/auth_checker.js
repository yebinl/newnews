const jwt = require('jsonwebtoken');
const User = require('mongoose').model('User');
const config = require('../config/config.json');

module.exports = (req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(401).end();
    }

    const token = req.headers.authorization.split(' ')[1];

    return jwt.verify(token, config.jwtSecret, (err, decoded) => {
        if (err) { return res.status(401).end(); }
        const id = decoded.sub;
        return User.findById(id, (userErr, user) => {
            if (userErr || !user) {
                return res.status(401).end();
            }
            return next();
        });
    });
};
