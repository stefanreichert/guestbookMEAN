'use strict'

var config = require('../config/config');
var client = require('mongodb').MongoClient;
var Promise = require('promise')

exports.connectToDatabase = function(connectionString) {
                        	return new Promise(function (resolve, reject){
                                        client.connect(config.dbConnectionString, function(err, connection) {
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
exports.disconnectFromDatabase = function() {
                                exports.connection.close();
                        }
