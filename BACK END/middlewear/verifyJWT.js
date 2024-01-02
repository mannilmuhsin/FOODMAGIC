require("dotenv").config();
const jwt = require("jsonwebtoken");
const user_schema = require("../schemas/user_schema");

const verifyJWT =(req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) return res.sendStatus(403);
  const token = authHeader;
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async(err, decode) => {
    if (err) return res.sendStatus(403);
    // console.log('mannil');
    req.user = decode.username;
    // const userdata =await user_schema.findOne({ username: req.user, isAccess: true })

    //   if (!userdata) {
    //     // console.log('woooooooooooooooooooooooooooooooooooooooooooooooooooooooo');
    //     return res.sendStatus(400)
    //   }
    next();
  });
};

module.exports=verifyJWT