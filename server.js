"use strict";

let express = require('express'),
  compression = require('compression'),
  bodyParser = require('body-parser'),
  expressValidator = require('express-validator'),
  session = require('express-session'),
  auth = require('./server/auth'),
  works = require('./server/works'),
  comments = require('./server/comments'),
  artists = require('./server/artists'),
  users = require('./server/users'),
  jwtauth = require('./server/jwtauth'),
  validation = require('./server/formValidation'),
  multer = require('multer'),
  app = express();

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.set('port', process.env.PORT || 3000);

//Express Session
app.use(
  session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true
  }));

// Adding CORS support
app.all('*', function (req, res, next) {
    // Set CORS headers: allow all origins, methods, and headers: you may want to lock this down in a production environment
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, PATCH, POST, DELETE");
    res.header("Access-Control-Allow-Headers", req.header('access-control-request-headers'));

    if (req.method === 'OPTIONS') {
        // CORS Preflight
        res.send();
    } else {
        next();
    }
});

//Express Validator
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
    var namespace = param.split('.')
    , root = namespace.shift()
      , formParam = root;
    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param: formParam,
      msg: msg,
      value: value
    };
  }
}));

app.use(compression());
app.use('/api/uploads', express.static(__dirname + '/server/uploads'));

app.get('/', (req, res) => {
  res.send("Urban Applause API");
})

app.get('/api/dummy', artists.findAllDummy);



//Photo Uploads via Multer
var Storage = multer.diskStorage({
  destination: function(req, file, callback) {
    callback(null, "./server/uploads");
  },
    filename: function(req, file, callback) {
    callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
    }
});

 var upload = multer({
    storage: Storage
 }).array("photos", 20); //Field name and max count

//Server-side routes
app.post("/api/upload", [jwtauth], function(req, res) {
  upload(req, res, function(err) {
    if (err) {
      console.log(err);
      return res.end("Something went wrong!");
    }
    res.send(req.files);
    return res.end('success');
  });
});

app.post('/api/register', auth.register);
app.post('/api/login', auth.login);

app.get('/api/works', works.findAll);
app.get('/api/works/:id', works.findById);
app.post('/api/newwork', [jwtauth], works.submitNew);
app.delete('/api/deletework/:id', [jwtauth], works.deleteWork);

app.get('/api/comments/:work_id', comments.findByWorkId);
app.post('/api/newcomment', [jwtauth], comments.submitNew);
app.delete('/api/deletecomment/:id', [jwtauth], comments.deleteComment);

app.get('/api/artists', artists.findAll);
app.get('/api/artists/:id', artists.findById);
app.post('/api/newartist', [jwtauth], artists.submitNew);
app.put('/api/updateartist/:id', [jwtauth], artists.updateById);

app.get('/api/users', users.findAll);
app.get('/api/users/:id', users.findById);
app.post('/api/newuser', users.submitNew);
app.put('/api/updateuser/:id', [jwtauth], users.updateById);

app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
