require("dotenv").config();
const jwt = require("jsonwebtoken");

const verifyJWT = (req, res, next) => {
  // console.log('hey re');
  const authHeader = req.headers["authorization"];
  if (!authHeader) return res.sendStatus(403);
  // console.log(authHeader);
  const token = authHeader;
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decode) => {
    if (err) return res.sendStatus(403);
    // console.log('mannil');
    req.user = decode.username;
    next();
  });
};

module.exports=verifyJWT