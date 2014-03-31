var services = angular.module('services', ['ngResource', 'angularSpinner', 'toaster']);

services.service('guestbookService', ['$resource', function ($resource) {

  var Dedication = $resource('dedication/:dedicationId', {dedicationId:'@id'});

  this.addDedication = function (author, text) {
    // create new dedication ith given data
    var dedication = new Dedication();
    dedication.author = author;
    dedication.text = text;
    
    return dedication.$save().
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

  this.showError = function (message, err){
    toaster.pop('error', message);
    console.log(err);
  };

  this.showSuccess = function (message){
    toaster.pop('success', message);
  }

  this.showWarning = function (message){
    toaster.pop('warning', message);
  }

}]);