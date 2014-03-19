var service = angular.module('service', []);

service.factory('guestbookService', ['$http', function($http) {
    return {
        addDedication : function(author, text, callback) {
            $http.post('/dedication', {'author':author, 'text':text}).
                success(function(data, status, headers, config) {
                  callback(data);
                }).
                error(function(data, status, headers, config){
                  window.alert(status);
                });
        },
        removeDedication : function(id, callback) {
            $http.delete('/dedication/' + id).
                success(function(data, status, headers, config) {
                 callback(data);
                }).
                error(function(data, status, headers, config){
                  window.alert(status);
                });
        },
        loadAll : function(callback) {
            $http.get('/dedication').
                success(function(data, status, headers, config) {
                  callback(data);
                }).
                error(function(data, status, headers, config){
                  window.alert(status);
                });
        }
    }
  }]);