const mongoose = require('mongoose');

const Post = mongoose.model('Post');

module.exports.registerPost = (req, res, next) => {
    var post = new Post(req.body);
    console.log("DENTRO DEL CONTROLLER", post);
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
};

module.exports.registerLikes = (req, res) => {
  
    console.log("Req Body is", req.body);
    if (!req.body.id) {
        res.json({ success: false, message: "No se especificó un id"});
    }else{
        Post.getById(req.body.id, (err, post) =>{
            if(err){
                res.json({success:false, message: "No es un id válido"});
            }else{
                console.log("1er else", post)
                if(!post){
                    res.json({success:false, message: "No se encontró el post"})
                }else{ 
                  console.log("2do else", post)
                    Post.registerLikes(post);
                    //console.log("LLEGO", post.likes);                
                }
            }
        })
    }
};


module.exports.registerDislikes = (req, res) => {
  
  console.log("Req Body is", req.body);
  if (!req.body.id) {
      res.json({ success: false, message: "No se especificó un id"});
  }else{
      Post.getById(req.body.id, (err, post) =>{
          if(err){
              res.json({success:false, message: "No es un id válido"});
          }else{
              console.log("1er else", post)
              if(!post){
                  res.json({success:false, message: "No se encontró el post"})
              }else{ 
                console.log("2do else", post)
                  Post.registerDislikes(post);
                  //console.log("LLEGO", post.likes);                
              }
          }
      })
  }
};

