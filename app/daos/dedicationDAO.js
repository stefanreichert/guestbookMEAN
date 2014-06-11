'use strict'

var Promise = require('promise');

// prepare the mongodb collection for dedications
var collectionName = 'dedications';

// DAO stuff
var factory = require('../models/dedicationFactory');
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
    
var internalLoadAll = function(dedicationCollection){
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

var internalFindAuthors = function(dedicationCollection, prefix){
    console.info('find authors with prefix %s', prefix);
    var authorMatch = new RegExp('');
    return new Promise(function (resolve, reject){
            dedicationCollection.aggregate(
                [
                    {
                        $match : {
                            author : {$regex : '^' + prefix, $options: 'i'}
                        }
                    },
                    { 
                        $group : {
                            _id: 'authors', 
                            authors: {$addToSet: '$author'}
                        }
                    }
                ],
                function (error, result) {
                    if(error){
                        reject(error);
                    }
                    else if(result && result[0]){
                        resolve(result[0].authors);
                    }
                    else{
                        resolve([]);
                    }
                });
        });
}

var internalCreate = function(dedicationCollection, author, text){
    console.info('create dedication with author: %s and text: %s', author, text);
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

var internalRemove = function(dedicationCollection, id){
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
                            return internalLoadAll(dedicationCollection);
                        });
                    }
exports.findAuthors = function (prefix){
                    return getDedicationCollection().
                        then(function (dedicationCollection){
                            return internalFindAuthors(dedicationCollection, prefix);
                        });
                    }
exports.create = function (author, text){
                    return getDedicationCollection().
                        then(function (dedicationCollection){
                            return internalCreate(dedicationCollection, author, text);
                        });
                    }
exports.remove = function (id){
                    return getDedicationCollection().
                        then(function (dedicationCollection){
                            return internalRemove(dedicationCollection, id);
                        });
                    }