"use strict";
var bcrypt = require('bcrypt-nodejs');
var jwt = require('jwt-simple');
var moment = require('moment');
let db = require('./pghelper');


let login = (req, res, next) => {
  var username = req.body.username;
  var password = req.body.password;

  let sql = "SELECT id, email, username, hash_pass from users where username = '" + username + "';";
    db.query(sql)
    .then(result => {
      if (result.length ==0) {
        res.json({error: 'user does not exist'})
        return;
      }
      console.log(result);
      bcrypt.compare(password, result[0].hash_pass, function(err, resp){
        if (resp==true) {

          console.log('generating token..');
          var expires = moment().add('days', 7).valueOf();

          var token = jwt.encode({
            iss: result[0].id,
            exp: expires
          }, 'jwtTokenSecret');

          console.log('token: ', token);

          res.json({
            token : token,
            expires: expires,
            user: result[0]
          });
        } else {
          res.json({
            error: "Invalid Credentials"
          });
        }

      });
    });
  };



let register = (req, res, next) => {
  var email = req.body.email;
  var username = req.body.username;
  var password = req.body.password;
  var password2 = req.body.password2;

  console.log(email);

  //Validations
  req.checkBody('email', 'Email is not valid').isEmail();
  req.checkBody('email', 'Email is required').notEmpty();
  req.checkBody('username', 'Username is required').notEmpty();
  req.checkBody('password', 'Password is required').notEmpty();
  req.checkBody('password2', 'Passwords do not match').equals(password);

  var errors = req.validationErrors();

  if(errors) {
    console.log('yes, there are errors');

    res.json({sucessful: false, errors: errors});
  } else {
    var salt = bcrypt.genSaltSync(10);
    bcrypt.hash(password, salt, null, function(err, hash){
      let sql = "INSERT INTO users (email, username, hash_pass) VALUES ('" + email + "', '" + username + "', '" + hash + "');";
      db.query(sql)
        .then(item => res.json({sucessful: true}))
        .catch(next);
    });
  }
};



exports.register = register;
exports.login = login;


