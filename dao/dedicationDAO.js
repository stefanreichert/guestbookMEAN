// prepare the mongodb collection for dedications
var collectionName = 'dedications';

// DAO stuff
var factory = require('../model/dedicationFactory');
var dbConnection = require('../db/dbConnection');
var ObjectID = require('mongodb').ObjectID;
    
var loadAll = function(callback){
    console.info('loading all dedications');
    dbConnection.db.createCollection(collectionName, function(err, dedications) {
        if(err) {
            callback(err, []);
        }
        else{
            dedications.find({}, {sort:{'date':-1}}).toArray(callback);
        }
    });
}

var create = function(author, text, callback){
    console.info('create dedication with author: %s and text: %', author, text);
    dbConnection.db.createCollection(collectionName, function(err, dedications) {
        if(err) {
            callback(err, null);
        }
        else{
            // create the object
            var dedication = factory.newInstance(author, text);
            // insert the new document to the collection
            dedications.insert(dedication, {safe:true}, callback);
        }
    });
};

var remove = function(id, callback){
    console.info('remove dedication with id: %s', id)
    dbConnection.db.createCollection(collectionName, function(err, dedications) {
        if(err) {
            callback(err, null);
        }
        else{
            // remove the document from the collection
            dedications.remove({"_id": new ObjectID(id)}, {safe:true}, callback);
        }
    });
};

exports.loadAll = loadAll;
exports.create = create;
exports.remove = remove;