const mongoose = require("mongoose");

const community_schema = new mongoose.Schema({
  title:{
    type:String,
    required:true
  },
  users:{
    type: Array,
    default:[]
  },
  proImage:{
    type: String,
  },
  date:{
    type:Date,
    default:Date.now()
  },
  messages:{
    type:Array,
    default:[]
  }
});

module.exports = mongoose.model("community", community_schema);
