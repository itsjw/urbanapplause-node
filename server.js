"use strict";

let express = require('express'),
    compression = require('compression'),
    works = require('./server/works'),
    artists = require('./server/artists'),
    users = require('./server/users'),
    app = express();

var bodyParser = require('body-parser');

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));
app.set('port', process.env.PORT || 3000);

app.use(compression());

app.use('/', express.static(__dirname + '/public'));
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
})
app.get("/artists*", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
})
app.get("/works*", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
})
app.get("/about*", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
})
app.get("/contact*", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
})
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
app.get('/api/works', works.findAll);
app.get('/api/works/:id', works.findById);
app.post('/api/newwork', works.submitNew);
app.delete('/api/deletework/:id', works.deleteWork);

app.get('/api/artists', artists.findAll);
app.get('/api/artists/:id', artists.findById);
app.post('/api/newartist', artists.submitNew);
app.put('/api/updateartist/:id', artists.updateById);

app.get('/api/users', users.findAll);
app.get('/api/users/:id', users.findById);
app.put('/api/newuser', users.findAll);
app.put('/api/updateuser/:id', users.updateById);

app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
