const mongoose = require("mongoose");

const course_schema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  coverImage: {
    type: Object,
    required: true,
  },
  demoVideo: {
    type: Object,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  aboutChef: {
    type: String,
    required: true,
  },
  chef: {
    type: String,
    required: true,
  },
  chapters:{
    type:Array,
    default:[]
  }
});

module.exports = mongoose.model("course", course_schema);
