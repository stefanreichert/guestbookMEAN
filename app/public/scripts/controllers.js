'use strict'

var controllers = angular.module('controllers',['services', 'ngEventEmitter']);

controllers.controller('notificationsController', ['$log', '$scope', '$on', function ($log, $scope, $on){
    // subscribe for notifications
    $on('notification', function (event, args){
        if($scope.notifications){
            $scope.notifications.show(args.message, args.type);
        }
    });
}]);

controllers.controller('newDedicationController', ['$scope', 'guestbookService', function ($scope, guestbookService){

    $scope.newText = '';
    $scope.newAuthor = '';

    $scope.authorProposalPrefix = '';
    $scope.authorProposals = [];

    $scope.$watch("newAuthor", 
        function(newValue, oldValue) {
            if (proposalUpdateRequired(newValue, $scope.authorProposalPrefix)){
                $scope.authorProposalPrefix = newValue.substring(0,3);
                guestbookService.findAuthors($scope.authorProposalPrefix).then(
                    function (authors){
                        $scope.authorProposals = authors;
                    }
                );
            }
            else if ($scope.authors && $scope.authors.length > 0){
                $scope.authorProposalPrefix = '';
                $scope.authorProposals = [];
            }
        });

    var proposalUpdateRequired = function (authorText, completionPrefix){
        // at least 3 chars are available
        return authorText && authorText.length >= 3 && authorText.substring(0,3) !== completionPrefix;
    }
}]);

controllers.controller('guestbookController', ['$scope', '$log', 'guestbookService', 'spinnerService', 'notificationService', function ($scope, $log, guestbookService, spinnerService, notificationService) {
    $scope.dateFormat = 'dd.MM.yyyy HH:mm';
    $scope.dedications = [];

    this.addDedication = function (author, text) {
        var valid = true;
        if (!author) {
            notificationService.warning('cannot add dedication: author is missing!');
            valid = false;
        }
        if (!text) {
            notificationService.warning('cannot add dedication: text is missing!');
            valid = false;
        }
        if(valid) {
            spinnerService.startSpinning();
            guestbookService.addDedication(author, text).then(
                function (dedication){
                    $scope.dedications.unshift(dedication);
                    notificationService.success('dedication "' + text + '" added');
                }
            ).catch(
                function(err){
                    notificationService.error('Failed to add dedication', err);
                }
            ).then(
                function(){
                    spinnerService.stopSpinning();
                }
            );
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
                    notificationService.success('dedication removed');
                }).
                catch(function(err){
                    notificationService.error('Failed to remove dedication', err);
                }).
                then(function(){
                    spinnerService.stopSpinning();
                });
        }
        else{
            notificationService.error('cannot remove dedication, key is missing!');
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
                notificationService.error('Failed to load dedications', err);
            }).
            then(function(){
                spinnerService.stopSpinning();
            });
    }

    this.refresh();
}]);