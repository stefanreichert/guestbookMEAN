var services = angular.module('services', ['resources', 'angularSpinner', 'toaster']);

services.service('guestbookService', ['Dedication', function (Dedication) {

  this.addDedication = function (author, text) {
    // create new dedication ith given data
    return Dedication.save({author: author, text: text}).$promise.
      then(function (dedication) {
        return dedication;
      });
  };

  this.removeDedication = function (id) {
    return Dedication.remove({dedicationId:id}).$promise.
      then(function (success) {
        return id;
      });
  };
    
  this.loadAll = function () {
    return Dedication.query().$promise.
      then(function (dedications) {
        return dedications;
      });
  }
}]);

services.service('spinnerService', ['usSpinnerService', function (usSpinnerService) {
    var spinnerID = 'spinner';

    this.startSpinning = function() {
      usSpinnerService.spin(spinnerID);
    };
    
    this.stopSpinning = function() {
      usSpinnerService.stop(spinnerID);
    };
}]);

services.service('messageService', ['toaster', function (toaster) {
  var show = function(type, message){
    if(message){
      toaster.pop(type, message);
    }
  }

  this.showError = function (message, err){
    show('error', message);
    console.log(err);
  };

  this.showSuccess = function (message){
    show('success', message);
  }

  this.showWarning = function (message){
    show('warning', message);
  }

}]);