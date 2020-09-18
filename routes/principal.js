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

//Post
router.post('/newPost', PostController.registerPost);
//router.get('/posts', PostController.showPosts);
router.get('/posts/:id', function(req, res, next) {
    var id = req.params.id
    User.findById(id)        
        .lean().exec(function (err, results) {
        if (err) return console.error(err)
        try {
            console.log(results)            
        } catch (error) {
            console.log("errror getting results")
            console.log(error)
        } 
    })
})

// Authenticate
router.post('/authenticate', UserController.auth);

// Profile
router.get('/profile', passport.authenticate('jwt', {session:false}), (req, res, next) => {
    res.json({user: req.user});
});



module.exports = router; 