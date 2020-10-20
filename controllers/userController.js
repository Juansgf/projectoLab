const mongoose = require('mongoose'); 

const jwt = require('jsonwebtoken');
const config = require('../config/db')

const User = mongoose.model('User');

module.exports.register = (req, res, next) => { 
    var user = new User(req.body);
    User.addUser(user, (err, user) => {
        if(err){
          res.json({success: false, msg:'Fallo al registrar usuario'});
        } else {
          res.json({success: true, msg:'Usuario registrado'});
        }
    }); 
} 

module.exports.auth = (req, res, next) => { 
    const email = req.body.email;
    const password = req.body.password;
  
    User.getUserByUsername(email, (err, user) => {
      if(err) throw err;
      if(!user){
        return res.json({success: false, msg: 'Usuario no encontrado'});
      }
  
      User.comparePassword(password, user.password, (err, isMatch) => {
        if(err) throw err;
        if(isMatch){
          const token = jwt.sign({data:user}, config.secret, {
            expiresIn: 604800 // 1 week
            });
  
            res.json({
                success: true,
                token: 'JWT '+token,
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email
                }
            });
        } else {
          return res.json({success: false, msg: 'Contraseña incorrecta'});
        }
      });
    });
} 

