'use strict'

var controllers = angular.module('controllers',['services', 'ui.bootstrap']);

controllers.controller('newDedicationController', ['$scope', 'guestbookService', function ($scope, guestbookService){
   $scope.newText = '';
   $scope.newAuthor = '';
}]);

controllers.controller('guestbookController', ['$scope', 'guestbookService', 'spinnerService', 'messageService', function ($scope, guestbookService, spinnerService, messageService) {
    $scope.dateFormat = 'dd.MM.yyyy HH:mm';
    $scope.dedications = [];

    this.addDedication = function (author, text) {
        var valid = true;
        if (!author) {
            messageService.showWarning('cannot add dedication, author is missing!');
            valid = false;
        }
        if (!text) {
            messageService.showWarning('cannot add dedication, text is missing!');
            valid = false;
        }
        if(valid) {
            spinnerService.startSpinning();
            guestbookService.addDedication(author, text).
                then(function (dedication){
                    $scope.dedications.unshift(dedication);
                    messageService.showSuccess('dedication "' + text + '" added');
                }).
                catch(function(err){
                    messageService.showError('Failed to add dedication', err);
                }).
                then(function(){
                    spinnerService.stopSpinning();
                });
        }
    }

    this.removeDedication = function (id) {
        if(id){
            spinnerService.startSpinning();
            guestbookService.removeDedication(id).
                then(function (id){
                    var filteredDedications = $scope.dedications.filter(
                            function (element, index, array){
                                return element._id != id;
                            });
                    $scope.dedications = filteredDedications;
                    messageService.showSuccess('dedication removed');
                }).
                catch(function(err){
                    messageService.showError('Failed to remove dedication', err);
                }).
                then(function(){
                    spinnerService.stopSpinning();
                });
        }
        else{
            messageService.showError('cannot remove dedication, key is missing!');
        }
    };

    this.refresh = function () {
        spinnerService.startSpinning();
        guestbookService.loadAll().
            then(function(freshDedications){
                if(freshDedications){
                    $scope.dedications = freshDedications.splice(0);
                }
            }).
            catch(function(err){
                messageService.showError('Failed to load dedications', err);
            }).
            then(function(){
                spinnerService.stopSpinning();
            });
    }

    this.refresh();
}]);