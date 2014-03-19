var connectionString = 'mongodb://localhost:27017/guestbook';
var client = require('mongodb').MongoClient;

exports.initialize = function(callback){
        client.connect(connectionString, function(err, db) {
        if(err) {
            console.dir(err);
        }
        else{
            exports.db = db;
        }
        callback(err);
    });   
}