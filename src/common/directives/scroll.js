
/*
 * Based on http://selbie.wordpress.com/2011/01/23/scale-crop-and-center-an-image-with-correct-aspect-ratio-in-html-and-javascript/
 *
 */
angular.module('directives.scroll', [])

.directive( 'whenScrolled', [ function() {

        return function(scope, elm, attr) {
            var raw = elm[0];
            
            elm.bind('scroll', function() {
                if (raw.scrollTop + raw.offsetHeight >= raw.scrollHeight) {
                    scope.$apply(attr.whenScrolled);
                }
            });
        };

}])


;