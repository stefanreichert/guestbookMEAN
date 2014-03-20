var dedicationDAO = require("../../dao/dedicationDAO")

exports.guestbook = function(req, res){
  dedicationDAO.loadAll(function(err, dedications){
    res.render('guestbook', {
                          moment: require('moment'),
                          dedications : dedications
                        });  
  })
};