var controller = angular.module('controller',['service', 'util']);

controller.controller('GuestbookController', ['guestbookService', 'formatter', function(guestbookService, formatter) {
        this.dedications = [];
        var newText = '';
        var newAuthor = '';
        var that = this;
        
        this.addDedication = function(author, text) {
            if (author && text) {
                guestbookService.addDedication(author, text, function(dedication){
                    that.refresh();
                });
            }
        }
        
        this.removeDedication = function(id) {
            guestbookService.removeDedication(id, function(dedication){
                that.refresh();
            });
        };
        
        this.refresh = function() {
            guestbookService.loadAll(function(freshDedications){
                that.dedications = freshDedications;
            });
        }
        
        this.formatDate = function(date){
            return formatter.formatDate(date);
        }
        
        this.refresh();
    }]);