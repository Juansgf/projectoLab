const mongoose = require('mongoose');

const Post = mongoose.model('Post');
const User = mongoose.model('User');
const Notification = mongoose.model('Notification');

module.exports.registerNotification = (req, res, next) => {
    var noti = new Notification(req.body);
    console.log("Notificacion", noti);
    noti.save().then(item => {
        //res.send(item);
        res.json({success: true, msg:'Notificación registrada'});
    })
    .catch(err => {
      res.json({success: false, msg:'Ocurrió un problema con la notificación'});
    });

};

// module.exports.showAllPosts = (req, res) => {
//   Post.find({}, (err, posts) => {
//     if(err){
//         res.json({ success: false, message: err})
//     } else{
//         if(!posts){
//             res.json({ success: false, message: "No hay posts"})
//         } else {
//             res.json({ success: true, post: posts})
//         }
//     }
//   }).sort({'_id': -1})
// };
