var connectionString = 'mongodb://localhost:27017/guestbook';
var client = require('mongodb').MongoClient;
var Promise = require('promise')

exports.connect = function(callback){
        client.connect(connectionString, function(err, connection) {
        if(!err) {
            exports.connection = connection;
        }
        callback(connection, err);
    });   
};