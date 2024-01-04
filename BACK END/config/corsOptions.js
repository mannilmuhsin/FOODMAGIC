
const allowedOrigins = require('./allowdOrgins');

const corsOptions = {
    origin: (origin, callback) => {
        console.log(origin)
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            console.log('allowed ');
            callback(null, true)
        } else {
            console.log('not allowed ');
            console.log(req.headers);
            callback(new Error('Not allowed by CORS'));
        }
    },
    optionsSuccessStatus: 200
}

module.exports = corsOptions;