const mongoose = require("mongoose");

const category_schema = new mongoose.Schema({
  date: {
    type: Date,
    default: Date.now(),
  },
  title: {
    type: String,
    required: true,
  },
  image:{
    type:Object,
    
  }
});

module.exports = mongoose.model("categorys", category_schema);
