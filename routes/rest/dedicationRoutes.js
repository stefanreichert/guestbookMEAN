var dedicationDAO = require("../../dao/dedicationDAO")

exports.create = function(req, res){
  if(!req.body.hasOwnProperty('author') || !req.body.hasOwnProperty('text')) {
    res.statusCode = 400;
    res.send('Error 400: Post syntax incorrect.');
  }
  else{
    dedicationDAO.create(req.body.author.trim(), req.body.text.trim(),
      function(err, dedications){
        if (err) {
          console.info(err);
          res.statusCode = 500;
          res.send('Error 500: failed to create');
        }
        else{
          console.info("created dedication with id %s", dedications[0]._id);
          res.json(dedications[0]);
        }
      }
    );
  }
};

exports.all = function(req,res){
  dedicationDAO.loadAll(function(err, dedications){
      res.json(dedications);
  });
}

exports.remove = function(req, res){
  var id = req.params.id;
  dedicationDAO.remove(
    id,
    function(err, numberOfRemovedDedications){
      if (err) {
        console.info(err);
        res.statusCode = 500;
        res.send('Error 500: failed to create');
      }
      else if (numberOfRemovedDedications != 0) {
        console.info("removed dedication with id %s", id);
        res.json(true);
      }
      else{
          res.statusCode = 404;
          res.send('Error 404: No dedication found.');
      }
    }
  );
};