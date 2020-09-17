const mongoose = require('mongoose');
const config = require('../config/db');

// User Schema
const PostSchema = mongoose.Schema({
  tit: {
    type: String,
    required: true
  },
  cont: {
    type: String,
    required: true
  },
  email:{
    type:String,
    require:false
  }
});


const Post = module.exports = mongoose.model('Post', PostSchema);

module.exports.getPostById = function(id, callback){
    Post.findById(id, callback);
  }
  
  module.exports.getPostByTit = function(tit, callback){
    const query = {tit: tit}
    Post.findOne(query, callback);
  }
