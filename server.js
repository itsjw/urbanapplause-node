"use strict";

let express = require('express'),
  compression = require('compression'),
  bodyParser = require('body-parser'),
  cookieParser = require('cookie-parser'),
  expressValidator = require('express-validator'),
  flash = require('flash'),
  session = require('express-session'),
  passport = require('passport'),
  auth = require('./server/auth'),
  works = require('./server/works'),
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
app.use(session({
  secret: 'secret',
  saveUninitialized: true,
  resave: true
}));



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

//Connect Flash
app.use(flash());

//Set global variables
app.use(function(req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

app.use(compression());
app.use(express.static('public'));
app.use('/', express.static(__dirname + '/public'));
app.use('/api/uploads', express.static(__dirname + '/server/uploads'));



app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
})
app.get("/artists*", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
})
app.get("/works*", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
})
app.get("/users*", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
})
app.get("/about*", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
})
app.get("/contact*", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
})


//SSL
app.get('/health-check', (req, res) => res.sendStatus(200));
app.get('/.well-known/acme-challenge/zDLl5Nh1cTBdjhuUHYFQDJj8OurBlxOejyFAftrPLqI', function(req, res) {
  res.send('zDLl5Nh1cTBdjhuUHYFQDJj8OurBlxOejyFAftrPLqI.HtPdwjhatvllMzHkse39fa1Ztvp-IU_eWQXqT155dPs')
});
app.get('/.well-known/acme-challenge/2gTbndH5fwLnW75fXlkAsLcOnv1wZ2Yt2LL3BHib1e4', function(req, res) {
  res.send('2gTbndH5fwLnW75fXlkAsLcOnv1wZ2Yt2LL3BHib1e4.HtPdwjhatvllMzHkse39fa1Ztvp-IU_eWQXqT155dPs')
})
// Adding CORS support


app.all('*', function (req, res, next) {
    // Set CORS headers: allow all origins, methods, and headers: you may want to lock this down in a production environment
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, PATCH, POST, DELETE, post, get");
    res.header("Access-Control-Allow-Headers", req.header('access-control-request-headers'));

    if (req.method === 'OPTIONS') {
        // CORS Preflight
        res.send();
    } else {
        next();
    }
});
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
 }).array("photos", 3); //Field name and max count

app.post("/api/upload", function(req, res) {
  upload(req, res, function(err) {
    if (err) {
      console.log(err);
      return res.end("Something went wrong!");
    }
    console.log(req.files);
    res.send(req.files);
    return res.end('success');

     });
 });

app.get('/api/test', function (req, res) {
  console.log(process.env.DATABASE_URL);
  res.send({
    json: [
      {
        id: process.env.DATABASE_URL
      }
    ]
  });
});

function ensureAuthenticated() {
}
app.post('/api/register', auth.register);
app.post('/api/login', auth.login);

app.get('/api/works', works.findAll);
app.get('/api/works/:id', works.findById);
app.post('/api/newwork', validation.works, works.submitNew);
app.delete('/api/deletework/:id', works.deleteWork);

app.get('/api/artists', artists.findAll);
app.get('/api/artists/:id', artists.findById);
app.post('/api/newartist', artists.submitNew);
app.put('/api/updateartist/:id', artists.updateById);

app.get('/api/users', users.findAll);
app.get('/api/users/:id', users.findById);
app.post('/api/newuser', users.submitNew);
app.put('/api/updateuser/:id', users.updateById);

app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
