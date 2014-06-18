var directives = angular.module('directives', []);

directives.directive('gbRequired', function(){
	function link(scope, element, attrs) {
		element.attr('required', '');
    }
    return {
      link: link
    };
});