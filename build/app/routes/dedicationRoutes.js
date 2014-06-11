/*! guestbookMEAN 2014-06-10 */
"use strict";var dedicationDAO=require("../daos/dedicationDAO");exports.create=function(a,b){a.body.hasOwnProperty("author")&&a.body.hasOwnProperty("text")?dedicationDAO.create(a.body.author.trim(),a.body.text.trim()).then(function(a){b.json(a)}).catch(function(a){console.info(a),b.statusCode=500,b.send("Error 500: failed to create")}):(b.statusCode=400,b.send("Error 400: Post syntax incorrect."))},exports.all=function(a,b){dedicationDAO.loadAll().then(function(a){b.json(a)}).catch(function(a){console.info(a),b.statusCode=500,b.send("Error 500: failed to load")})},exports.findAuthors=function(a,b){var c=a.query.prefix;c?dedicationDAO.findAuthors(c).then(function(a){b.json(a)}).catch(function(a){console.info(a),b.statusCode=500,b.send("Error 500: failed to load")}):(b.statusCode=400,b.send("Error 400: Get syntax incorrect."))},exports.remove=function(a,b){var c=a.params.id;c?dedicationDAO.remove(c).then(function(a){console.info("removed dedication with id %s",a),b.json(!0)}).catch(function(a){console.info(a),b.statusCode=500,b.send("Error 500: failed to remove")}):(b.statusCode=400,b.send("Error 400: Get syntax incorrect."))};