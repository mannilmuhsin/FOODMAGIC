const mongoose = require("mongoose");

const blog_schema = new mongoose.Schema({
  date: {
    type: Date,
    default: Date.now(),
  },
  content: {
    type: String,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  user: {
    type: String,
    required: true,
  },
  image:{
    type:Object,
    
  }
});

module.exports = mongoose.model("blogs", blog_schema);
