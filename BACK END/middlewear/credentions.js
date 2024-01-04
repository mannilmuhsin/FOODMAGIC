const allowedOrigins = require('../config/allowdOrgins');

const credentials = (req, res, next) => {
    const origin = req.headers.origin;
    console.log('credntion',origin);
    if (allowedOrigins.includes(origin)) {
        console.log('on credention includes')
        res.header('Access-Control-Allow-Credentials', true);
    }
    console.log(req.headers);

    next();
}

module.exports = credentials