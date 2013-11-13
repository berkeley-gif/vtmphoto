angular.module("custom-directive", []).directive('custom', function ($parse) {

    return {
        restrict: "A",
        link: function(scope, element, attrs) {
            //using $parse instead of scope[attrs.datepicker] for cases
            //where attrs.datepicker is 'foo.bar.lol'
/*            var m = $scope.selectedMarkers;
            console.log(m);*/
            console.log(scope);
            console.log(element);
            console.log(attrs);
            parsed = $parse(attrs.custom);
            console.log(parsed);
/*            $(element).custom({
                onChange: function(newValue, inst) {
					console.log('reached here');
                    scope.$apply(function(){
                        parsed.assign(scope, newValue);
                    });
                }
            });*/
			$(element).onChange(function(newValue, inst){
				console.log('reached here');
                    scope.$apply(function(){
                        parsed.assign(scope, newValue);
                    });
                });
        }
    };
}); 