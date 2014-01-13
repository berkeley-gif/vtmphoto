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
angular.module( 'home', [
  //angular modules
  'ui.router',
  //controllers
  'map',
  'gallery',
  'sidebar',
  //services
  'services.markerData',
  'services.holosData'
])

/**
 * Each section or module of the site can also have its own routes. AngularJS
 * will handle ensuring they are all available at run-time, but splitting it
 * this way makes each module more "self-contained".
 */
.config(function config($stateProvider) {
  $stateProvider.state( 'home', {
    url: '/home',
    templateUrl: 'home/home.tpl.html',
    controller: 'HomeCtrl'
  });
})

.controller('HomeCtrl', ['$scope', '$timeout', 'holosData', 'markerData' ,function ($scope, $timeout, holosData, markerData) {

  
  //Initialize variables used by child scopes
/*  $scope.mapData = {
      bbox : null

  };*/


     //Get data from http response
  //TODO: Handle http error
  //TODO: Update data when map bounds are changed during pan, zoom in, zoom out
  //$scope.results = holosData.getData();
  //console.log($scope.results);

  // $scope.mapData.update = function() {
  //      if(!holosData.isDataLoaded()) {                                        
  //           console.log('Data hasn\'t been loaded, invoking holosData.loadData()');
  //           holosData.loadData('http://ecoengine.berkeley.edu/api/photos/?format=json&georeferenced=True&collection_code=VTM&bbox=' + $scope.mapData.bbox)
  //                .then(function() {
  //                     console.log('loadData.then(), here the holosData should have loaded the values from the storageService.');
  //                     var data = holosData.getData();
  //                     markerData.updateMarkers(data);
  //                     markerData.resetFilteredMarkers();
  //                });
                 
  //      } else {
  //           console.log('Data has already been loaded from storageService, getting cached data instead.');
            
  //           $scope[results] = holosData.getData();
  //      }
  // };





}]) //End: HomeCtrl

;

