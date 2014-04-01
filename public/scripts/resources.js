var resources = angular.module('resources', ['ngResource']);

resources.factory('Dedication', ['$resource', function ($resource){
  return $resource('dedication/:dedicationId', {dedicationId:'@id'});
}]);
