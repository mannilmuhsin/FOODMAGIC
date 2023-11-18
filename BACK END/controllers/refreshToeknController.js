const jwt = require("jsonwebtoken");
const user_schema = require("../schemas/user_schema");
require("dotenv").config();

const handlerefreshtoken = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.status(400);
  // console.log(cookies.jwt);
  const refreshtoken = cookies.jwt;

  let user = await user_schema.findOne({ JWT: refreshtoken });
 
  // console.log(user);
  if (!user) return res.status(400);

  jwt.verify(refreshtoken, process.env.REFRESH_TOKEN_SECRET, (err, decod) => {
    if (err || user.username !== decod.username) return res.sendStatus(400);

    const accesstoken = jwt.sign(
      { username: decod.username },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "10s" }
    );
    res.json({ accesstoken,
      role:user.role,
      user: user.username,});
  });
};

module.exports = { handlerefreshtoken };
