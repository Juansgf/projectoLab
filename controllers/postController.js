const mongoose = require('mongoose');

const Post = mongoose.model('Post');

module.exports.registerPost = (req, res, next) => {
    var post = new Post(req.body);
    post.save().then(item => {
        //res.send(item);
        res.json({success: true, msg:'Publicación registrada'});
    })
    .catch(err => {
      res.json({success: false, msg:'Ocurrió un problema con la publicación'});
    });

};

module.exports.showPosts = (req, res) => {
  let id = req.body.id;
  Post.getPostById(id).then((post) => {
    if (post == null) {
      res.status(404).send('Not found');
      return;
    }
    res.send('Publicación encontrada');
  });
}

