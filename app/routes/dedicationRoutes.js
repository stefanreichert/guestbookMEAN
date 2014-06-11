'use strict'

var dedicationDAO = require('../daos/dedicationDAO');

exports.create = function(req, res){
  if(!req.body.hasOwnProperty('author') || !req.body.hasOwnProperty('text')) {
    res.statusCode = 400;
    res.send('Error 400: Post syntax incorrect.');
  }
  else{
    dedicationDAO.create(req.body.author.trim(), req.body.text.trim()).
      then(function (dedication){
        res.json(dedication);
      }).
      catch(function(err){
          console.info(err);
          res.statusCode = 500;
          res.send('Error 500: failed to create');
      });
  }
};

exports.all = function(req,res){
  dedicationDAO.loadAll().
    then(function (dedications){
      res.json(dedications);
    }).
    catch(function(err){
      console.info(err);
      res.statusCode = 500;
      res.send('Error 500: failed to load');
    });
};

exports.findAuthors = function(req,res){
  var prefix = req.query.prefix;
  if(!prefix){
    res.statusCode = 400;
    res.send('Error 400: Get syntax incorrect.');
  }
  else{
    dedicationDAO.findAuthors(prefix).
      then(function (authors){
        res.json(authors);
      }).
      catch(function(err){
        console.info(err);
        res.statusCode = 500;
        res.send('Error 500: failed to load');
      });
  }
};

exports.remove = function(req, res){
  var id = req.params.id;
  if(!id){
    res.statusCode = 400;
    res.send('Error 400: Get syntax incorrect.');
  }
  else{
    dedicationDAO.remove(id).
      then(function (id){
        console.info('removed dedication with id %s', id);
        res.json(true);
      }).
      catch(function(err){
          console.info(err);
          res.statusCode = 500;
          res.send('Error 500: failed to remove');
      });
  }
};