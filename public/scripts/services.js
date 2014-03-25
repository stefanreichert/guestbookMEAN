var service = angular.module('services', []);

service.factory('guestbookService', ['$http', function ($http) {

  return {

    addDedication : function (author, text, callback) {
      $http.post('/dedication', {'author':author, 'text':text}).
      success(function(data, status, headers, config) {
        callback(data, null);
      }).
      error(function(data, status, headers, config){
        callback(data, status);
      });
    },
    
    removeDedication : function (id, callback) {
      $http.delete('/dedication/' + id).
      success(function(data, status, headers, config) {
        callback(data, null);
     }).
      error(function(data, status, headers, config){
        callback(data, status);
      });
    },
    
    loadAll : function (callback) {
      $http.get('/dedication').
      success(function(data, status, headers, config) {
        callback(data, null);
      }).
      error(function(data, status, headers, config){
        callback(data, status);
      });
    }
  }
}]);