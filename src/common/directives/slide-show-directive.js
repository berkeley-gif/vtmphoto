angular.module( 'bnSlideShow', [] )

.directive( 'bnSlideShow', function() {
  return {
    restrict: "A",
	link: function( $scope, element, attributes ) {
	 
		// I am the TRUTHY expression to watch.
		var expression = attributes.bnSlideShow;

		// I am the optional slide duration.
		var duration = ( attributes.slideShowDuration || "fast" );


		// I check to see the default display of the
		// element based on the link-time value of the
		// model we are watching.
		if ( ! $scope.$eval( expression ) ) {

			element.hide();

		}

		// I watch the expression in $scope context to
		// see when it changes - and adjust the visibility
		// of the element accordingly.
		$scope.$watch(expression, function( newValue, oldValue ) {

			// Ignore first-run values since we've
			// already defaulted the element state.
			if ( newValue === oldValue ) {
				return;
			}

			// Show element.
			if ( newValue ) {
				console.log(expression);
				element
					.stop( true, true )
					.slideToggle( duration )
				;

			// Hide element.
			} else {
				console.log(expression);
				element
					.stop( true, true )
					.slideToggle( duration )
				;

			}

		});

	}	

  }; //End return

})

;