'use strict'

var connectionString = 'mongodb://localhost:27017/guestbook';
var client = require('mongodb').MongoClient;
var Promise = require('promise')

exports.connectToDatabase = function() {
                        	return new Promise(function (resolve, reject){
                                        client.connect(connectionString, function(err, connection) {
                                                if(err) {
                                                        reject(err);
                                                }
                                                else{
                                                        exports.connection = connection;
                                                        resolve(connection);
                                                }
                                        });
                                });
                        }