"use strict";

let express = require('express'),
    compression = require('compression'),
    works = require('./server/works'),
    app = express();

app.set('port', 3000);

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

app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
