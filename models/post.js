const mongoose = require('mongoose');
const config = require('../config/db');

// User Schema
var PostSchema = new mongoose.Schema({
  tit: String,
  cont: String,
  email: String
});


const Post = module.exports = mongoose.model('Post', PostSchema);

module.exports.getPostById = function(id, callback){
  Post.findById(id, callback);
}
  
module.exports.getPostByTit = function(tit, callback){
  const query = {tit: tit}
  Post.findOne(query, callback);
}
