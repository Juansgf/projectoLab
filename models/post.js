const mongoose = require('mongoose');
const config = require('../config/db');
const User = require('../models/user');
const { post } = require('../routes/principal');

// Post Schema
var PostSchema = new mongoose.Schema({
  title: {type:String, requited:true},
  content: {type:String, required:true},
  createdBy: {type:String, default: "el loggeado en este momento"},
  iconBy: {type:String},
  likes: {type: Number, default:0},
  dislikes: {type:Number, default:0},
  comments: [{
    comment: {type:String},
  }]
});


const Post = module.exports = mongoose.model('Post', PostSchema);


module.exports.getById = function(id, callback) {
  console.log("find by: "+ id);
 
  Post.findById(id, callback);
 
}
  
module.exports.getPostByTitle = function(title, callback){
  const query = {title: title}
  Post.findOne(query, callback);
}

module.exports.registerLikes = function(post, callback){
  console.log(post);
  let id = post.id;
  let likes = post.likes;
  Post.updateOne({_id: id}, {likes : likes + 1}, function(err, res) {
    if (err) throw err;
    console.log("1 document updated");
  });
};


module.exports.registerDislikes = function(post, callback){
  console.log(post);
  let id = post.id;
  let dislikes = post.dislikes;
  Post.updateOne({_id: id}, {dislikes : dislikes + 1}, function(err, res) {
    if (err) throw err;
    console.log("1 document updated");
  });
};

