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
  'dataService',
  'markerService',
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

.controller('HomeCtrl', ['$scope', '$timeout', 'dataService', 'markerService' ,function ($scope, $timeout, dataService, markerService) {

  
  //Initialize variables used by child scopes
  $scope.bbox = '';
  $scope.countyList = [];

  


  $scope.results = dataService.getData();

  //Get data from http response
  //TODO: Handle http error
  //TODO: Update data when map bounds are changed during pan, zoom in, zoom out
 
  $scope.updateData = function(results, markers) {
       if(!dataService.isDataLoaded()) {                                        
            console.log('Data hasn\'t been loaded, invoking dataService.loadData()');
            dataService.loadData('http://ecoengine.berkeley.edu/api/photos/?county=Tulare&format=json&georeferenced=True&collection_code=VTM')
                 .then(function() {
                      console.log('loadData.then(), here the dataService should have loaded the values from the storageService.');
                      $scope[results] = dataService.getData();
                      console.log($scope[results]);
                      markerService.updateMarkers($scope[results]);
                      //$scope[markers] = markerService.getMarkers();
                      //console.log($scope[markers]);
                 });
                 
       } else {
            console.log('Data has already been loaded from storageService, getting cached data instead.');
            
            $scope[results] = dataService.getData();
       }
  };


   





}]) //End: HomeCtrl

;

