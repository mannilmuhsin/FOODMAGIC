const user_schema = require("../schemas/user_schema");

const getUsers = async (req, res) => {
  try {
    // console.log(req.query.role);
    const studens = await user_schema.find({ role: req.query.role });
    res.json({ studens });
  } catch (error) {
    console.log(error.message);
  }
};

const handleaccess = async (req, res) => {
  try {
    const { name } = req.body;
    const user = await user_schema.findOne({ username: name });
    await user_schema.updateOne(
      { username: name },
      { $set: { isAccess: !user.isAccess, JWT: "" } }
    );

    res.status(200).json({ message: "access changed success fully" });
    console.log(name);
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  getUsers,
  handleaccess,
};
