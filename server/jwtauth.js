var jwt = require('jwt-simple');

module.exports = function(req, res, next) {
  var token = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['x-access-token'];

  if (token) {
    try {
      var decoded = jwt.decode(token, 'jwtTokenSecret');
      if (decoded.exp <= Date.now()) {
        res.end('Access token has expired', 400);
      }
      let sql = "SELECT * FROM users WHERE id = " + decoded.iss + ";";
      db.query(sql)
        .then(result => {
          req.user = result[0]
        });

    } catch (err) {
      return next();
    }
  } else {
    next();
  }
};
