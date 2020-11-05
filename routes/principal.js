const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const Post = require('../models/post');
const PostController = require('../controllers/postController');
const UserController = require('../controllers/userController'); 
const config = require('../config/db')

// Register
router.post('/register', UserController.register);
router.put('/updateProfile/:id', UserController.update);

//Post
router.put('/editPost/:id', PostController.updatePost);
router.delete('/deletePost/:id', PostController.deletePost);
router.post('/newPost', PostController.registerPost);
//router.get('/posts', PostController.showPosts);
router.post('/allPosts', (req, res, next) => {
    Post.find({}, (err, posts) => {
        if(err){
            res.json({ success: false, message: err})
        } else{
            if(!posts){
                res.json({ success: false, message: "No hay posts"})
            } else {
                res.json({ success: true, post: posts})
            }
        }
    }).sort({'_id': -1})
})


//like
router.put('/likePost', PostController.registerLikes);


//dislike
router.put('/dislikePost', PostController.registerDislikes);

//addComments
router.put('/addComment', PostController.addCommentPost);

// Authenticate
router.post('/authenticate', UserController.auth);

// Profile
router.get('/profile', passport.authenticate('jwt', {session:false}), (req, res, next) => {
    res.json({user: req.user});
});

router.get('/userPost/:id', UserController.getPost);

module.exports = router; 