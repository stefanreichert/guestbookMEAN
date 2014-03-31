var Promise = require('promise');

// prepare the mongodb collection for dedications
var collectionName = 'dedications';

// DAO stuff
var factory = require('../model/dedicationFactory');
var connector = require('../db/connector');
var ObjectID = require('mongodb').ObjectID;

var getDedicationCollection = function(){
    return new Promise(function (resolve, reject){
        connector.connection.createCollection(collectionName, function(err, dedications) {
            if(err) {
                reject(err);
            }
            else{
                resolve(dedications);
            }
        });
    });
}
    
var loadAllInternal = function(dedicationCollection){
    console.info('load all dedications');
    return new Promise(function (resolve, reject){
        dedicationCollection.find({}, {sort:{'date':-1}}).toArray(function(err, allDedications){
            if(err) {
                reject(err);
            }
            else{
                console.info("loaded all dedications");
                resolve(allDedications);
            }
        });
    });
}

var createInternal = function(dedicationCollection, author, text){
    console.info('create dedication with author: %s and text: %', author, text);
    return new Promise(function (resolve, reject){
        // insert the new document to the collection
        dedicationCollection.insert(factory.newInstance(author, text), {safe:true}, function(err, newDedications){
            if(err) {
                reject(err);
            }
            else{
                console.info("created dedication with id %s", newDedications[0]._id);
                resolve(newDedications[0]);
            }
        });
    });
}

var removeInternal = function(dedicationCollection, id){
    console.info('remove dedication with id: %s', id)
    return new Promise(function (resolve, reject){
        // remove the document from the collection
        dedicationCollection.remove({"_id": new ObjectID(id)}, {safe:true}, function(err){
            if(err) {
                reject(err);
            }
            else{
                resolve(id);
            }
        });
    });
}

exports.loadAll = function (){
                    return getDedicationCollection().
                        then(function (dedicationCollection){
                            return loadAllInternal(dedicationCollection);
                        });
                    }
exports.create = function (author, text){
                    return getDedicationCollection().
                        then(function (dedicationCollection){
                            return createInternal(dedicationCollection, author, text);
                        });
                    }
exports.remove = function (id){
                    return getDedicationCollection().
                        then(function (dedicationCollection){
                            return removeInternal(dedicationCollection, id);
                        });
                    }