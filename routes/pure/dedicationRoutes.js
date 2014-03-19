var dedicationDAO = require("../../dao/dedicationDAO")

exports.create = function(req, res){
  dedicationDAO.create(
    req.body.dedication.author,
    req.body.dedication.text,
    function(err, dedications){
      console.info("created dedication with id %s", dedications[0]._id);
      res.redirect('/pure/index');
    }
  );
};

exports.remove = function(req, res){
  var id = req.body.id;
  dedicationDAO.remove(
    id,
    function(err, numberOfRemovedDedications){
      if (numberOfRemovedDedications != 0) {
        console.info("removed dedication with id %s", id);
      }
      else{
        console.info("failed to remove dedication with id %s", id);
      }
      res.redirect('/pure/index');
    }
  );
};