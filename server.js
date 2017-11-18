"use strict";

let express = require('express'),
    compression = require('compression'),
    works = require('./server/works'),
    artists = require('./server/artists'),
    app = express();

var bodyParser = require('body-parser');

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));
app.set('port', process.env.PORT || 3000);

app.use(compression());

app.use('/', express.static(__dirname + '/public'));

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

app.get('/works', works.findAll);
app.get('/works/:id', works.findById);
app.post('/newwork', works.submitNew);
app.delete('/deletework/:id', works.deleteWork);

app.get('/artists', artists.findAll);
app.get('/artists/:id', artists.findById);
app.post('/newartist', artists.submitNew);
app.put('/updateartist/:id', artists.updateById);


app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
