const mongoose = require('mongoose');

const Post = mongoose.model('Post');

module.exports.register = (req, res, next) => {
    var post = new Post();
    post.tit = req.body.tit;
    post.cont = req.body.cont;
    user.save((err, doc) => {
        if (!err)
            res.send(doc);
        else {
            return next(err);
        }

    });
}