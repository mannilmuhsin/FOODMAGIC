const mongoose = require("mongoose");

const chefSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: Number,
    default: 3000,
  },
  pic: {
    type: String,
  },
  isAccess: {
    type: Boolean,
    default: true,
  },
  JWT: {
    type: String,
    default: "",
  },
  bankacountnumber: {
    type: Number,
  },
  IFCC: {
    type: String,
  },
  isVerify: {
    type: Boolean,
    default: false,
  },
  OTP: {
    type: String,
  },
});



module.exports = mongoose.model("chefs", chefSchema);
