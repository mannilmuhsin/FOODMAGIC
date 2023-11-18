const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
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
    default: 2000,
  },
  pic: {
    type: Object,
  },
  isVerify: {
    type: Boolean,
    default: false,
  },
  isAccess: {
    type: Boolean,
    default: true,
  },
  JWT: {
    type: String,
    default: "",
  },
  OTP: {
    type: String,
    default: "",
  },
  createdAt:{
    type:Date,
    default:Date.now()
  }

  
});





module.exports = mongoose.model("users", userSchema);
