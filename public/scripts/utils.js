var util = angular.module('utils', [])

util.factory('formatter', function() {
        
        var assertTwoDigits = function (value){
            if (value.length == 1) {
                return '0' + value;
            }
            return value;
        }
        
        return {
            formatDate : function (timestamp){
                var date = new Date(timestamp);
                var year = date.getFullYear().toString();
                var month = (date.getMonth() + 1).toString();
                var day = date.getDate().toString();
                var hours = date.getHours().toString();
                var minutes = date.getMinutes().toString();
                return year + '/' + assertTwoDigits(month) + '/' + assertTwoDigits(day) + ' ' + assertTwoDigits(hours) +  ':' + assertTwoDigits(minutes); // padding
            }
        }
    });


