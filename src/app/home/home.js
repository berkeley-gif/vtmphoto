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
  'ui.router',
  'leaflet-directive',
  'dataService',
  'map',
  'gallery',
  'sidebar'
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

.controller('HomeCtrl', ['$scope', 'leafletData', 'dataService', function ($scope, leafletData, dataService) {

  //Set default map center and zoom
  //TODO: Get location from user IP address
  $scope.center = {
                    lat: 36.23,
                    lng: -118.8,
                    zoom: 10
                };

  //Get data from http response
  //TODO: Handle http error
  //TODO: Update data when map bounds are changed during pan, zoom in, zoom out

  dataService.data_async().then(function(data) {
      $scope.data = data;
       console.log($scope.data);
  });
  
 


  //Initialize variables used by child scopes
  $scope.markers = {};
  $scope.filteredMarkers = {};
  
  $scope.layers = {
                    baselayers: {
                        stamen: {
                            name: 'Terrain',
                            type: 'xyz',
                            url: 'http://{s}.tile.stamen.com/terrain/{z}/{x}/{y}.png',
                            layerOptions: {
                                subdomains: ['a', 'b', 'c'],
                                attribution: 'Map tiles by Stamen Design, under CC BY 3.0. Data by OpenStreetMap, under CC BY SA.',
                                continuousWorld: true
                            }
                        }
                    }
  };

 $scope.countyList = [];

  //Temp function to get map bounds
  //TODO: Figure out how to get map bounds from service
  $scope.showLeaflet = function() {
    leafletData.getMap().then(function(map) {
        console.log(map.getBounds());
    });
  };

/*  $scope.map = leafletData.getMap();

  $scope.$watch('map', function () {
    $scope.bounds = map.getBounds();
    console.log($scope.bounds);
  });*/








}]) //End: HomeCtrl

;

