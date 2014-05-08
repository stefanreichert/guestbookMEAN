'use strict'

var express = require('express');
var restDedicationRoutes = require('./routes/dedicationRoutes');
var connector = require('./db/connector');
var Promise = require('promise');
var http = require('http');
var path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(app.router);
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// REST routes
app.get('/dedication', restDedicationRoutes.all);
app.post('/dedication', restDedicationRoutes.create);
app.delete('/dedication/:id', restDedicationRoutes.remove);

var startServer = function (){
  return new Promise(function (resolve, reject){
    var server = http.createServer(app);
    server.on('error', function (err) {
      reject(err);
    });

    server.listen(app.get('port'), function () {
      resolve(server);
    });
  });
};

console.log('Express server starting ...');
connector.connectToDatabase().
  then(function (connection){
    console.log('Successfully connected to a MongoDB at %s [name: %s, poolsize: %d]', connection.serverConfig.name, connection.databaseName, connection.serverConfig.poolSize);
    return startServer();
  }).
  then(function (server){
    console.log('Express server listening on localhost:%d', server._events.request.settings.port);
  }).
  catch(function (err) {
    console.error('Failed to start express server: %s', err);
  });
