/**
 * Each section of the site has its own module. It probably also has
 * submodules, though this boilerplate is too simple to demonstrate it. Within
 * `src/app/home`, however, could exist several additional folders representing
 * additional modules that would then be listed as dependencies of this one.
 * For example, a `note` section could have the submodules `note.create`,
 * `note.delete`, `note.edit`, etc.
 *
 * Regardless, so long as dependencies are managed correctly, the build process
 * will automatically take take of the rest.
 *
 * The dependencies block here is also where component dependencies should be
 * specified, as shown below.
 */
angular.module( 'sidebar', [
'ui.filters',
'ui.slider',
//services
'services.markerData',
'bnSlideShow'
])

/**
 * Each section or module of the site can also have its own routes. AngularJS
 * will handle ensuring they are all available at run-time, but splitting it
 * this way makes each module more "self-contained".
 */


.controller('SidebarCtrl', ['$scope', '$filter', 'markerData', function ($scope, $filter, markerData) {

	// Initialize markers		
	$scope.sidebar = {
		markers : markerData.getMarkers()
	};

	// Initialize filter fields
	$scope.filter = {
		county : "",
		authors : ""
	};

	// Initialize slider values
	var currentYear = new Date().getFullYear();
	$scope.yearSlider = {
		min: 1920,
		max: currentYear,
		range: [1920, currentYear]
	};

	// Watch markers
	$scope.$watchCollection('sidebar.markers', function(){		
		$scope.markerCount = $scope.sidebar.markers.length;
		$scope.filteredMarkers = $scope.sidebar.markers;
		$scope.filteredCount = $scope.filteredMarkers.length;

	});

	// Filter function
	$scope.filterMarkers = function (){

		//Reset filtered markers to all markers in scope
		$scope.filteredMarkers = $scope.sidebar.markers;
		
		var filtered;
		filtered = $filter('filter')($scope.filteredMarkers, function (marker) {

			var countyMatch = true;
			var authorsMatch = true;
			var yearMatch = true;

			if ($scope.filter.county != 'All'){
				countyMatch = searchMatch(marker.county, $scope.filter.county);
			}
			if ($scope.filter.authors != 'All') {
				authorsMatch = searchMatch(marker.authors, $scope.filter.authors);
			}
			console.log($scope.yearSlider.range);
			if (($scope.yearSlider.range[0] != 1920) || ($scope.yearSlider.range[1] != currentYear)) {
				var year = new Date(marker.begin_date).getFullYear();
				if ((year < $scope.yearSlider.range[0]) || (year > $scope.yearSlider.range[1])) {
					yearMatch = false;
				}
			}

			return (countyMatch && authorsMatch && yearMatch);
		});

		if (filtered){
			$scope.filteredCount = filtered.length;
			$scope.filteredMarkers = filtered;
			markerData.updateFilteredMarkers($scope.filteredMarkers);
		}

		

	};


	// Search helper function
	var searchMatch = function (haystack, needle) {
		if (!needle) {
			return true;
		}
		return haystack.toLowerCase().indexOf(needle.toLowerCase()) !== -1;
	};

	// Toggle sidebar function
	$scope.toggle = function() {
		$scope.isVisible = ! $scope.isVisible;
	};
 
    // Default the blocks to be visible.
    $scope.isVisible = true;




}])

;

