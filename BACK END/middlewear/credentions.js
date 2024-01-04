const allowedOrigins = require('../config/allowdOrgins');

const credentials = (req, res, next) => {
    const origin = req.headers.origin;
    console.log('credntion',origin);
    if (allowedOrigins.includes(origin)) {
        res.header('Access-Control-Allow-Credentials', true);
    }
    next();
}

module.exports = credentials