var jwt = require('jwt-simple');
let db = require('./pghelper');

module.exports = function(req, res, next) {
  console.log('TOKEN:', req.body.token);
  var token = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['x-access-token'] || req.body.token;

  if (token) {
    try {
      var decoded = jwt.decode(token, 'jwtTokenSecret');
      if (decoded.exp <= Date.now()) {
        res.end('Access token has expired', 400);
      }
      let sql = "SELECT * FROM users WHERE id = " + decoded.iss + ";";
      db.query(sql)
        .then(result => {
          req.jwtauth = result[0]
          console.log('jwtauth result', result[0]);
        });
    } catch (err) {
      console.log('jwt error', err);
      return next();
    }
    next();
  } else {
    console.log('not authorized wiht token');
    next();
  }
};
