const mongoose = require('mongoose');
const config = require('../config/db');
const User = require('../models/user');

// User Schema
var PostSchema = new mongoose.Schema({
  tit: String,
  cont: String,
  email: String
});


const Post = module.exports = mongoose.model('post', PostSchema);



/*module.exports.getPostById = function(id){
  Post.findById(id, callback);
}*/

module.exports.findById = function(id, callback) {
  console.log("find by: "+ id);
  get_collection(function(collection) {
    collection.findOne({"_id": new ObjectId(id)}, function(err, doc) {
       callback(doc);
    });
  });
}
  
module.exports.getPostByTit = function(tit, callback){
  const query = {tit: tit}
  Post.findOne(query, callback);
}
