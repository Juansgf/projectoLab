const mongoose = require('mongoose');

const Post = mongoose.model('Post');

module.exports.registerPost = (req, res, next) => {
    var post = new Post(req.body);
    post.save().then(item => {
      res.json({success: true, msg:'User registered'});
    })
    .catch(err => {
      res.json({success: false, msg:'Failed to register user'});
    });
};