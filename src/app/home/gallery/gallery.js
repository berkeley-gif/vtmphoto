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
angular.module( 'gallery', [
//services
'services.markerData'
])

/**
 * Each section or module of the site can also have its own routes. AngularJS
 * will handle ensuring they are all available at run-time, but splitting it
 * this way makes each module more "self-contained".
 */


.controller('GalleryCtrl', ['$scope', 'markerData', function ($scope, markerData) {

    console.log('reached gallery control');

    $scope.gallery = {
		markers : markerData.getMarkers()
    };
    
	var itemsPerPage = 6;
	$scope.pagedPhotos = [];
	$scope.currentPage = 0;

	$scope.$watchCollection('gallery.markers', function(){
		$scope.totalItems = $scope.gallery.markers.length;
		$scope.currentPage = 0;
		$scope.groupToPages();
		console.log('photos', $scope.totalItems);
	});

	// calc pages in place
	$scope.groupToPages = function () {
		$scope.pagedPhotos = [];

		for (var i = 0; i < $scope.totalItems; i++) {
			if (i % itemsPerPage === 0) {
				console.log($scope.gallery.markers[i]);
				$scope.pagedPhotos[Math.floor(i / itemsPerPage)] = [ $scope.gallery.markers[i] ];
		} else {
				$scope.pagedPhotos[Math.floor(i / itemsPerPage)].push($scope.gallery.markers[i]);
			}
		}
	};

	$scope.prevPage = function () {
		if ($scope.currentPage > 0) {
			$scope.currentPage--;
		}
	};

	$scope.nextPage = function () {
		if ($scope.currentPage < $scope.pagedPhotos.length - 1) {
			$scope.currentPage++;
		}
	};

	$scope.setPage = function () {
		$scope.currentPage = this.n;
	};

	// like python's range fn
	$scope.range = function (start, end) {
		var ret = [];
		if (!end) {
			end = start;
			start = 0;
		}
		for (var i = start; i < end; i++) {
			ret.push(i);
		}
		return ret;
	};

   
    

}])

;

