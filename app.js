
/**
 * Module dependencies.
 */

var express = require('express');
var pureGuestbookRoutes = require('./routes/pure/guestbookRoutes');
var pureDedicationRoutes = require('./routes/pure/dedicationRoutes');
var restDedicationRoutes = require('./routes/rest/dedicationRoutes');
var dbConnection = require('./db/dbConnection');
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

// routes for pure html5 with EJS
// index
app.get('/pure/guestbook', pureGuestbookRoutes.index);
// guestbook
app.post('/pure/dedication', pureDedicationRoutes.create);
app.post('/pure/dedication/delete', pureDedicationRoutes.remove);

// REST routes
app.get('/dedication', restDedicationRoutes.all);
app.post('/dedication', restDedicationRoutes.create);
app.delete('/dedication/:id', restDedicationRoutes.remove);

var server = http.createServer(app).listen(app.get('port'), function(){
  dbConnection.initialize(function(err){
    if (err) {
      console.error('Failed to connect to MongoDB: %s', err);
      console.log('Express server is shutting down.');
      server.close();
    }
    else{
      console.log('MongoDB connected successfully.');
      console.log('Express server listening on port %d.',app.get('port'));
    }
  });
});
