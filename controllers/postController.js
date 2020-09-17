const mongoose = require('mongoose');

const Post = mongoose.model('Post');

module.exports.registerPost = (req, res, next) => {
    var post = new Post(req.body);
    post.save().then(item => {
        res.send("item saved to database");
    })
    .catch(err => {
      res.status(400).send("unable to save to database");
    });
};