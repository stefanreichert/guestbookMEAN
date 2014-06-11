'use strict'

var services = angular.module('services', ['resources', 'angularSpinner']);

services.service('guestbookService', ['Dedication', '$http', function (Dedication, $http) {

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

  this.findAuthors = function (prefix) {
    return $http.get('dedication/author', {params: { prefix: prefix }}).
      then(function (httpPromise) {
        return httpPromise.data;
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

services.service('messageService', ['$log', function ($log) {

  var _notifications;

  var show = function (type, message){
      if(_notifications && message){
          _notifications.show(message, type);
      }
      else{
          $log.log('cannot show [' + type + ']: ' + message);
      }
  }

  this.setNotifications = function (notifications){
    _notifications = notifications;
  }

  this.showError = function (message, err){
      show('error', message);
      $log.log(err);
  };

  this.showSuccess = function (message){
      show('success', message);
  }

  this.showWarning = function (message){
      show('warning', message);
  }
}]);