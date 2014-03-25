var controller = angular.module('controllers',['services', 'utils']);

controller.controller('newDedicationController', ['$scope', 'guestbookService', function ($scope, guestbookService){
   $scope.newText = '';
   $scope.newAuthor = '';

    $scope.addDedication = function (author, text) {
        if (author && text) {
            guestbookService.addDedication(author, text, function(dedication, err){
                if(err){
                    window.alert(err);
                }
                else{
                    $scope.refresh();
                }
            });
        }
    }

}]);

controller.controller('guestbookController', ['$scope', 'guestbookService', 'formatter', function ($scope, guestbookService, formatter) {
    $scope.dedications = [];

    $scope.removeDedication = function (id) {
        guestbookService.removeDedication(id, function(dedication, err){
            if(err){
                window.alert(err);
            }
            else{
                $scope.refresh();
            }
        });
    };

    $scope.refresh = function () {
        guestbookService.loadAll(function(freshDedications, err){
            if(err){
                window.alert(err);
            }
            else{
                $scope.dedications = freshDedications;
            }
        });
    }

    $scope.formatDate = function (date){
        return formatter.formatDate(date);
    }

    $scope.refresh();
}]);