'use strict'

var services = angular.module('services', ['resources', 'angularSpinner', 'ngEventEmitter']);

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

services.service('notificationService', ['$log', '$emit', function ($log, $emit) {

  var emitNotification = function (type, message){
    if(type && message){
      $emit('notification', {type: type, message: message});
    }
    else{
      $log.warn('ignoring [' + type + ']: ' + message);
    }
  }

  this.error = function (message, err){
      emitNotification('error', message);
      $log.log(err);
  };

  this.success = function (message){
      emitNotification('success', message);
  }

  this.warning = function (message){
      emitNotification('warning', message);
  }
}]);