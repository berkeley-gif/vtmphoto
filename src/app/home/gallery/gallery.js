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
//angular modules
'ngRoute',
'ui.router',
//services
'services.markerData',
'ui.bootstrap',
'detail',
'resources.photos',
'filters.thumbnail'
])

/**
 * Each section or module of the site can also have its own routes. AngularJS
 * will handle ensuring they are all available at run-time, but splitting it
 * this way makes each module more "self-contained".
 */


.controller('GalleryCtrl', ['$scope', '$location', '$rootScope', 'markerData', '$modal', '$log' ,
	function ($scope, $location, $rootScope, markerData, $modal, $log) {

    console.log('reached gallery control');

    $scope.gallery = {
		markers : markerData.getFilteredMarkers()
    };

    
	var itemsPerPage = 12;
	$scope.pagedPhotos = [];
	$scope.currentPage = 0;

	$scope.$watchCollection('gallery.markers', function(){
		$scope.totalItems = $scope.gallery.markers.length;
		$scope.currentPage = 0;
		$scope.groupToPages();
		console.log('photos', $scope.totalItems);
	});

	// Calculate pages in place
	$scope.groupToPages = function () {
		$scope.pagedPhotos = [];

		for (var i = 0; i < $scope.totalItems; i++) {
			if (i % itemsPerPage === 0) {
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


	////////////////////////
    //  OVERLAY HANDLING  //
    ////////////////////////

    

	//we want to cancel the state change to detail, and instead launch an overlay
    //however we must keep the URL to detail
	/*$scope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){
		//state change is prevented from home to detail
		//but the URL is preserved
		if(fromState.name === 'home' && toState.name === 'detail'){
			event.preventDefault();
		}
	});*/


	/**
     * Opens the overlay. This modifies the dialog options just as it is
     * opening to inject the ideaId and locationParams. This also registers
     * a closing callback when the overlay closes.
     * @param  {Number} ideaId Id of the Idea
     * @return {Void}
     */
	/*$scope.showModal = function(recordID){

		//setting up the overlay options
		var modalInstance = $modal.open({
			backdrop: true,
			backdropClick: true,
			dialogFade: false,
			keyboard: true,
			templateUrl: 'detail/detail.tpl.html',
			controller: 'DetailCtrl',
			resolve: {
				recordID: function(){ return recordID; },
				locationParamsAndHash: function(){ 
					return {
						path: $location.path(),
						search: $location.search(),
						hash: $location.hash()
					};
				}
			}		
		});

		//ideaId is to be injected to the overlay controller to get the correct idea
		//locationParamsAndHash is the current URL state before the overlay launches
		//it will be used when the overlay closes, and we want to return to original URL state
/*		modalInstance.resolve = {
			recordID: function(){ return recordID; },
			locationParamsAndHash: function(){ 
				return {
					path: $location.path(),
					search: $location.search(),
					hash: $location.hash()
				};
			}
		};*/

		//closing callback will receive the previous locationParams through the overlay
/*		modalInstance.result.then(function(locationParamsAndHash){

			$rootScope.viewingOverlay = false;
			$location.path(locationParamsAndHash.path);
			$location.search(locationParamsAndHash.search);
			$location.hash(locationParamsAndHash.hash);

		});

	};*/




	$scope.showModal = function (record) {
		
		//console.log($location.path());
		$scope.updateLocation(record);

		var modalInstance = $modal.open({
			backdrop: true,
			backdropClick: true,
			dialogFade: false,
			keyboard: true,
			templateUrl: 'detail/detail.tpl.html',
			controller: 'DetailCtrl',
			resolve: {
				photos:['Photos', function (Photos) {
					return Photos.getById (record);
				}]
			}
			
		});

		

		modalInstance.result.then(function () {
			//on ok button press
			//$scope.selected = selectedItem;
		}, function () {
			//on cancel button press
			//history.pushState({}, '#', '#/detail/'+ record);
			$log.info('Modal dismissed at: ' + new Date());
			history.replaceState({}, '#/detail/'+ record, '#');
		});

	};

	$scope.updateLocation = function(record){
		$location.path('/detail/'+record);
		var currentState = history.state;
		//console.log(currentState);
		history.replaceState({}, '#', '#/detail/'+ record);
		console.log($location.path());
		
	};

    

}])

;

